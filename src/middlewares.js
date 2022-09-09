import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const checkLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  }
  return res.redirect("/login");
};

export const checkLogout = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  }
  return res.redirect("/");
};

export const avatarUpload = multer({
  dest: "upload-files/avatars/",
  limits: { fileSize: 3000000 },
});

export const videoUpload = multer({
  dest: "upload-files/videos/",
  limits: { fileSize: 10000000 },
});
