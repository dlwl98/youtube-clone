import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  deleteUser,
  startGithubLogin,
  finishGithubLogin,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { checkLogin, checkLogout } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/:id(\\d+)", see);
userRouter.get("/github/start", checkLogout, startGithubLogin);
userRouter.get("/github/finish", checkLogout, finishGithubLogin);
userRouter.get("/logout", checkLogin, logout);
userRouter.route("/edit").all(checkLogin).get(getEdit).post(postEdit);
userRouter
  .route("/change-password")
  .all(checkLogin)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/delete", deleteUser);

export default userRouter;
