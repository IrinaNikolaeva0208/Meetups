import "module-alias/register";
import express from "express";
import * as dotenv from "dotenv";
import meetupsRouter from "./meetups/routers/meetups.router";
import { sendInvalidRouteResponse } from "@validators/sendInvalidRouteResponse";
import { validateJSON } from "@validators/validateJSON";
import authRouter from "./auth/routers/auth.router";
import checkIfTokenIsValid from "@authorization/checkIfTokenIsValid";
import { getUserByJwt } from "./user/getUserByJwt";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4000;

const meetupsApp = express();

meetupsApp.use(cors());
meetupsApp.use(validateJSON);
meetupsApp.use("/auth", authRouter);
meetupsApp.use("/meetups", checkIfTokenIsValid, meetupsRouter);
meetupsApp.use("/user", checkIfTokenIsValid, getUserByJwt);
meetupsApp.use(sendInvalidRouteResponse);

meetupsApp.listen(PORT, () => console.log("Server started on port " + PORT));
