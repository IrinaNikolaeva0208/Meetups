import { Router } from "express";
import { validateRequestProperty } from "@validators/validateRequestProperty";
import { CreateMeetupSchema } from "@schemas/createMeetup.schema";
import { UpdateMeetupSchema } from "@schemas/updateMeetup.schema";
import { MeetupIdSchema } from "@schemas/meetupId.schema";
import { checkRole } from "@authorization/checkRole";
import { Roles } from "@authInterfaces/roles.enum";
import { PaginationQueryParamsSchema } from "@schemas/paginationQueryParams.schema";
import { paginateAllMeetups } from "../middleware/functions/paginateResults";
import { signUpForMeetupByJwt } from "../middleware/functions/signUpForMeetupByJwt";
import MeetupResponser from "../middleware/classes/meetupResponser";

const meetupsRouter = Router();

meetupsRouter.get(
  "/",
  validateRequestProperty("query", PaginationQueryParamsSchema),
  paginateAllMeetups
);
meetupsRouter.post(
  "/",
  checkRole(Roles.meetup_organizer),
  validateRequestProperty("body", CreateMeetupSchema),
  MeetupResponser.createMeetup
);
meetupsRouter.get(
  "/:id",
  validateRequestProperty("params", MeetupIdSchema),
  MeetupResponser.getMeetup
);
meetupsRouter.patch(
  "/:id",
  checkRole(Roles.meetup_organizer),
  validateRequestProperty("params", MeetupIdSchema),
  validateRequestProperty("body", UpdateMeetupSchema),
  MeetupResponser.updateMeetup
);
meetupsRouter.delete(
  "/:id",
  checkRole(Roles.meetup_organizer),
  validateRequestProperty("params", MeetupIdSchema),
  MeetupResponser.deleteMeetup
);
meetupsRouter.post(
  "/signup/:id",
  validateRequestProperty("params", MeetupIdSchema),
  signUpForMeetupByJwt
);

export default meetupsRouter;
