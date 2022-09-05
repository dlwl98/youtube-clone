import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, email, username, password, confirmPassword, location } =
    req.body;
  const pageTitle = "Join";
  // Confirm Password
  if (password !== confirmPassword) {
    return res.status(400).render("join", {
      pageTitle,
      errorMsg: "Password confirmation does not match.",
    });
  }
  // Confirm Unique username, email
  const exists = await User.exists({ $or: [{ username }, { email }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMsg: "This username/email is already taken.",
    });
  }
  // Success Confirm
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res
      .status(400)
      .render("join", { pageTitle, errorMsg: error._message });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  // Confirm username
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMsg: "An account with this username does not exists.",
    });
  }
  // Confirm password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).render("login", {
      pageTitle,
      errorMsg: "Wrong password",
    });
  }
  // Login Success
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  // client_id 를 scope 설정 후 query로 넣어서 아래 URL로 리다이렉트 시킨다.
  // 그러면 그 URL에서 우리가 설정한 URL로 code를 넣어서 다시 리다이렉트 된다.
  const baseURL = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const targetURL = `${baseURL}?${params}`;
  return res.redirect(targetURL);
};

export const finishGithubLogin = async (req, res) => {
  // 받은 code를 다시 query로 넣어서 POST요청을 보내면 res에 토큰이 담겨온다.
  const baseURL = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const targetURL = `${baseURL}?${params}`;

  // POST요청 보내기
  const tokenRes = await (
    await fetch(targetURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  // 받은 요청에 대한 오류처리
  if ("access_token" in tokenRes) {
    const { access_token } = tokenRes;
    // 토큰을 이용해 GET요청을 보내면 user정보가 담긴 response가 온다.
    const githubUser = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    // email 정보도 불러오기
    const emailRes = await (
      await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    // emailRes에서 사용중인 이메일을 뽑아내는 작업
    const emailObj = emailRes.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }

    // 해당 이메일을 가진 유저가 있으면 그 유저로 로그인 시키고 없다면 새로 만듦
    const existingUser = await User.findOne({ email: emailObj.email });
    if (existingUser) {
      // 로그인 성공
      req.session.loggedIn = true;
      req.session.user = existingUser;
      return res.redirect("/");
    } else {
      const newUser = await User.create({
        socialOnly: true,
        name: githubUser.name === null ? "" : githubUser.name,
        email: emailObj.email,
        username: githubUser.login,
        password: "",
        location: githubUser.location === null ? "" : githubUser.location,
      });
      req.session.loggedIn = true;
      req.session.user = newUser;
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => res.send("LOGOUT");

export const see = (req, res) => res.send("SEE USER");

export const edit = (req, res) => res.send("EDIT USER");

export const deleteUser = (req, res) => res.send("DELETE USER");
