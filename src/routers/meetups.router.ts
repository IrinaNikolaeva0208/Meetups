import { Router } from "express";
import MeetupController from "../controllers/meetup.controller";

const meetupsRouter = Router();

meetupsRouter.get("/meetups", MeetupController.getAll);
meetupsRouter.post("/meetups", MeetupController.create);
meetupsRouter.get("/meetups/:id", MeetupController.getById);
meetupsRouter.patch("/meetups/:id", MeetupController.update);
meetupsRouter.delete("/meetups/:id", MeetupController.delete);

export default meetupsRouter;
