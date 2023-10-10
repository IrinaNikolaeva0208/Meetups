import "module-alias/register";
import express from "express";
import { envVars } from "@utils/environment";
import { logger } from "@utils/logger";
import meetupsRouter from "./meetups.router";
import cookieParser from "cookie-parser";
import cors from "cors";
import { handleErrors, sendErrorInCaseOfWrongRoute } from "@utils/middleware";
import "./rabbitmq";
import { isAuthenticated } from "./middleware";

const PORT = envVars.MEETUPS_PORT;

const meetupsApp = express();

meetupsApp.use(cors());
meetupsApp.use(express.json());
meetupsApp.use(cookieParser());
meetupsApp.use("/", isAuthenticated, meetupsRouter);
meetupsApp.all("*", sendErrorInCaseOfWrongRoute);
meetupsApp.use(handleErrors);

meetupsApp.listen(PORT, () =>
  logger.info("Meetups service started on port " + PORT)
);
