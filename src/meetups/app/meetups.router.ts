import { Router } from "express";
import { validateRequestProperty } from "@utils/middleware";
import {
  CreateMeetupSchema,
  MeetupIdSchema,
  UpdateMeetupSchema,
  PaginationQueryParamsSchema,
  FullTextSearchSchema,
} from "./schemas";
import { Roles } from "@utils/interfaces/roles.enum";
import { MeetupsController } from "./meetups.controller";
import { hasRequiredRole } from "./middleware";

const meetupsRouter = Router();

meetupsRouter.get(
  "/",
  validateRequestProperty("query", PaginationQueryParamsSchema),
  MeetupsController.getPageOfMeetups
);
meetupsRouter.post(
  "/",
  hasRequiredRole(Roles.meetup_organizer),
  validateRequestProperty("body", CreateMeetupSchema),
  MeetupsController.createMeetup
);
meetupsRouter.get(
  "/search",
  validateRequestProperty("query", FullTextSearchSchema),
  MeetupsController.getPageOfMeetups
);
meetupsRouter.get(
  "/:id",
  validateRequestProperty("params", MeetupIdSchema),
  MeetupsController.getMeetupById
);
meetupsRouter.patch(
  "/:id",
  hasRequiredRole(Roles.meetup_organizer),
  validateRequestProperty("params", MeetupIdSchema),
  validateRequestProperty("body", UpdateMeetupSchema),
  MeetupsController.updateMeetup
);
meetupsRouter.delete(
  "/:id",
  hasRequiredRole(Roles.meetup_organizer),
  validateRequestProperty("params", MeetupIdSchema),
  MeetupsController.deleteMeetup
);
meetupsRouter.post(
  "/signup/:id",
  validateRequestProperty("params", MeetupIdSchema),
  MeetupsController.signUpForMeetup
);

export default meetupsRouter;
