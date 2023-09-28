import { Router } from "express";
import { validateRequestProperty } from "@validators/validateRequestProperty";
import { CreateMeetupSchema } from "@schemas/createMeetup.schema";
import { UpdateMeetupSchema } from "@schemas/updateMeetup.schema";
import { MeetupIdSchema } from "@schemas/meetupId.schema";
import { checkRole } from "../middleware/checkRole";
import { Roles } from "@authInterfaces/roles.enum";
import { PaginationQueryParamsSchema } from "@schemas/paginationQueryParams.schema";
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
