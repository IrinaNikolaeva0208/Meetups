import express from "express";
import * as dotenv from "dotenv";
import meetupsRouter from "./meetups/routers/meetups.router";
import { sendInvalidRouteResponse } from "./validation/middleware/sendInvalidRouteResponse";
import { validateJSON } from "./validation/middleware/validateJSON";

dotenv.config();

const PORT = process.env.PORT || 4000;

const meetupsApp = express();

meetupsApp.use(validateJSON);
meetupsApp.use("/meetups", meetupsRouter);
meetupsApp.use(sendInvalidRouteResponse);

meetupsApp.listen(PORT, () => console.log("Server started on port " + PORT));
