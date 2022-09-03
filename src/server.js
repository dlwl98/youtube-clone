import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const app = express();

// Middlewares
const logger = morgan("dev");

// set template engine
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

// use Middlewares
app.use(logger);
app.use(express.urlencoded({ extended: true }));

// use Routers
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
