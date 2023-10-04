import "module-alias/register";
import express from "express";
import { envVars } from "@utils/environment";
import { logger } from "@utils/logger";
import meetupsRouter from "./meetups/meetups.router";
import authRouter from "./auth/auth.router";
import cookieParser from "cookie-parser";
import cors from "cors";
import {
  handleErrors,
  sendErrorInCaseOfWrongRoute,
  checkIfTokenIsValid,
} from "@utils/middleware";

const PORT = envVars.PORT || 4000;

const meetupsApp = express();

meetupsApp.use(cors());
meetupsApp.use(express.json());
meetupsApp.use(cookieParser());
meetupsApp.use("/auth", authRouter);
meetupsApp.use("/meetups", checkIfTokenIsValid, meetupsRouter);
meetupsApp.all("*", sendErrorInCaseOfWrongRoute);
meetupsApp.use(handleErrors);

meetupsApp.listen(PORT, () => logger.info("Server started on port " + PORT));
