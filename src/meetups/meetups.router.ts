import { Router } from "express";
import { validateRequestProperty, checkRole } from "@utils/middleware";
import {
  CreateMeetupSchema,
  MeetupIdSchema,
  UpdateMeetupSchema,
  PaginationQueryParamsSchema,
} from "./schemas";
import { Roles } from "@utils/interfaces/roles.enum";
import { MeetupsController } from "./meetups.controller";

const meetupsRouter = Router();

meetupsRouter.get(
  "/",
  validateRequestProperty("query", PaginationQueryParamsSchema),
  MeetupsController.getPageOfMeetups
);
meetupsRouter.post(
  "/",
  checkRole(Roles.meetup_organizer),
  validateRequestProperty("body", CreateMeetupSchema),
  MeetupsController.createMeetup
);
meetupsRouter.get(
  "/:id",
  validateRequestProperty("params", MeetupIdSchema),
  MeetupsController.getMeetupById
);
meetupsRouter.patch(
  "/:id",
  checkRole(Roles.meetup_organizer),
  validateRequestProperty("params", MeetupIdSchema),
  validateRequestProperty("body", UpdateMeetupSchema),
  MeetupsController.updateMeetup
);
meetupsRouter.delete(
  "/:id",
  checkRole(Roles.meetup_organizer),
  validateRequestProperty("params", MeetupIdSchema),
  MeetupsController.deleteMeetup
);
meetupsRouter.post(
  "/signup/:id",
  validateRequestProperty("params", MeetupIdSchema),
  MeetupsController.signUpForMeetup
);

export default meetupsRouter;
