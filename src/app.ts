import "module-alias/register";
import express from "express";
import { envVars } from "@environment";
import { logger } from "@logger";
import meetupsRouter from "./meetups/routers/meetups.router";
import authRouter from "./auth/routers/auth.router";
import checkIfTokenIsValid from "@authorization/checkIfTokenIsValid";
import { getUserByJwt } from "./user/getUserByJwt";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createResponse } from "@responses/createResponse";
import { BadRequestError } from "@responses/httpErrors";

const PORT = envVars.PORT || 4000;

const meetupsApp = express();

meetupsApp.use(cors());
meetupsApp.use(express.json());
meetupsApp.use(cookieParser());
meetupsApp.use("/auth", authRouter);
meetupsApp.use("/meetups", checkIfTokenIsValid, meetupsRouter);
meetupsApp.use("/user", checkIfTokenIsValid, getUserByJwt);
meetupsApp.all("*", (req, _, next) => {
  next(BadRequestError(`Cannot find ${req.originalUrl}`));
});
meetupsApp.use((err, _, res, next) => {
  if (res.headersSent) return next(err);
  const response = createResponse(err.status || err.statusCode || 500, err);
  res.status(response.statusCode).json(response);
  response.statusCode < 500 ? logger.warn(err) : logger.error(err);
});

meetupsApp.listen(PORT, () => logger.info("Server started on port " + PORT));
