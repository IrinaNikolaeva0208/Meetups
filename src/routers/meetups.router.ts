import { Router } from "express";
import MeetupController from "../controllers/meetup.controller";

const meetupsRouter = Router();

meetupsRouter.get("/", MeetupController.getAll);
meetupsRouter.post("/", MeetupController.create);
meetupsRouter.get("/:id", MeetupController.getById);
meetupsRouter.patch("/:id", MeetupController.update);
meetupsRouter.delete("/:id", MeetupController.delete);

export default meetupsRouter;
