import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from 'dotenv';
import express from "express";
import fileUpload from "express-fileupload";
import { dbConnection } from './database/dbConnection.js';
import jobRouter from "./routes/jobRouter.js";
import userRouter from "./routes/userRouter.js";
 import { errorMiddleware } from './middlewares/error.js';
 import applicationRouter from "./routes/applicationRouter.js";
//import { default as jobRouter, default as userRouter } from "./routes/userRoutes.js";



const app = express();
dotenv.config({path: "./config/config.env"});
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET","POST","DELETE","PUT"],
    credentials: true,
}));

app.use(cookieParser());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir:"/tmp/",
}));

app.use("/api/v1/user",userRouter);
app.use("/api/v1/job",jobRouter);
app.use("/api/v1/application", applicationRouter);
dbConnection();
app.use(errorMiddleware);

export default app;