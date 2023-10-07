import "module-alias/register";
import express from "express";
import { envVars } from "@utils/environment";
import { logger } from "@utils/logger";
import authRouter from "./auth.router";
import cookieParser from "cookie-parser";
import cors from "cors";
import { handleErrors } from "@utils/middleware";

const PORT = envVars.AUTH_PORT;

const authApp = express();

authApp.use(cors());
authApp.use(express.json());
authApp.use(cookieParser());
authApp.use("/", authRouter);
authApp.use(handleErrors);

authApp.listen(PORT, () => logger.info("Auth service started on port " + PORT));
