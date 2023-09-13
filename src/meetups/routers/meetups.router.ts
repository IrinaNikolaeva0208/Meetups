import { Router } from "express";
import MeetupController from "../controllers/meetup.controller";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { CreateMeetupSchema } from "../../validation/schemas/createMeetup.schema";
import { UpdateMeetupSchema } from "../../validation/schemas/updateMeetup.schema";
import { MeetupIdSchema } from "../../validation/schemas/meetupId.schema";

const meetupsRouter = Router();

meetupsRouter.get("/", MeetupController.getAll);
meetupsRouter.post(
  "/",
  validateRequestProperty("body", CreateMeetupSchema),
  MeetupController.create
);
meetupsRouter.get(
  "/:id",
  validateRequestProperty("params", MeetupIdSchema),
  MeetupController.getById
);
meetupsRouter.patch(
  "/:id",
  validateRequestProperty("params", MeetupIdSchema),
  validateRequestProperty("body", UpdateMeetupSchema),
  MeetupController.update
);
meetupsRouter.delete(
  "/:id",
  validateRequestProperty("params", MeetupIdSchema),
  MeetupController.delete
);

export default meetupsRouter;
