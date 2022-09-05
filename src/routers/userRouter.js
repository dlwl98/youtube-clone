import express from "express";
import {
  edit,
  logout,
  see,
  deleteUser,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id(\\d+)", see);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/delete", deleteUser);

export default userRouter;
