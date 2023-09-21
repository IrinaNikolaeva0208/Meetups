import express from "express";
import * as dotenv from "dotenv";
import meetupsRouter from "./meetups/routers/meetups.router";
import { sendInvalidRouteResponse } from "./validation/middleware/sendInvalidRouteResponse";
import { validateJSON } from "./validation/middleware/validateJSON";
import authRouter from "./auth/routers/auth.router";
import checkIfTokenIsValid from "./auth/middleware/functions/checkIfTokenIsValid";
import { getUserByJwt } from "./user/getUserByJwt";

dotenv.config();

const PORT = process.env.PORT || 4000;

const meetupsApp = express();

meetupsApp.use(validateJSON);
meetupsApp.use("/auth", authRouter);
meetupsApp.use("/meetups", checkIfTokenIsValid, meetupsRouter);
meetupsApp.use("/user", checkIfTokenIsValid, getUserByJwt);
meetupsApp.use(sendInvalidRouteResponse);

meetupsApp.listen(PORT, () => console.log("Server started on port " + PORT));
