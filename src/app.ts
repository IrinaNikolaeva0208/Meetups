import "module-alias/register";
import express from "express";
import { envVars } from "@environment";
import meetupsRouter from "./meetups/routers/meetups.router";
import createError from "http-errors";
import authRouter from "./auth/routers/auth.router";
import checkIfTokenIsValid from "@authorization/checkIfTokenIsValid";
import { getUserByJwt } from "./user/getUserByJwt";
import cors from "cors";

const PORT = envVars.PORT || 4000;

const meetupsApp = express();

meetupsApp.use(cors());
meetupsApp.use(express.json());
meetupsApp.use("/auth", authRouter);
meetupsApp.use("/meetups", checkIfTokenIsValid, meetupsRouter);
meetupsApp.use("/user", checkIfTokenIsValid, getUserByJwt);
meetupsApp.all("*", (req, _, next) => {
  next(createError(404, `Cannot find ${req.originalUrl}`));
});

meetupsApp.listen(PORT, () => console.log("Server started on port " + PORT));
