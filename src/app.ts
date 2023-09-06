import express from "express";
import * as dotenv from "dotenv";
import meetupsRouter from "./routers/meetups.router";

dotenv.config();

const PORT = process.env.PORT || 4000;

const meetupsApp = express();

meetupsApp.listen(PORT, () => console.log("Server started on port " + PORT));
