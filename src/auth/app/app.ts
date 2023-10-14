import "module-alias/register";
import express from "express";
import { envVars } from "@utils/environment";
import { logger } from "@utils/logger";
import authRouter from "./auth.router";
import cookieParser from "cookie-parser";
import { handleErrors, sendErrorInCaseOfWrongRoute } from "@utils/middleware";
import "./rabbitmq";

const PORT = envVars.AUTH_PORT;

const authApp = express();

authApp.use(express.json());
authApp.use(cookieParser());
authApp.use("/", authRouter);
authApp.all("*", sendErrorInCaseOfWrongRoute);
authApp.use(handleErrors);

authApp.listen(PORT, () => logger.info("Auth service started on port " + PORT));
