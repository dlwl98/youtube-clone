import express from "express";
import {
  watch,
  getEdit,
  postEdit,
  getUpload,
  postUpload,
  deleteVideo,
} from "../controllers/videoController";
import { checkLogin, videoUpload } from "../middlewares";

const videoRouter = express.Router();

// middlewares
videoRouter.use("/upload-files", express.static("upload-files"));

// routers
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(checkLogin)
  .get(getEdit)
  .post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(checkLogin).get(deleteVideo);
videoRouter
  .route("/upload")
  .all(checkLogin)
  .get(getUpload)
  .post(videoUpload.single("video"), postUpload);

export default videoRouter;
