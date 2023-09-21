import { Router } from "express";
import MeetupController from "../middleware/classes/meetupDatabaseController";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { CreateMeetupSchema } from "../../validation/schemas/createMeetup.schema";
import { UpdateMeetupSchema } from "../../validation/schemas/updateMeetup.schema";
import { MeetupIdSchema } from "../../validation/schemas/meetupId.schema";
import { checkRole } from "../../auth/middleware/checkRoles";
import { Roles } from "../../auth/enums/roles";
import { PaginationQueryParamsSchema } from "../../validation/schemas/paginationQueryParams.schema";
import { paginateResults } from "../middleware/functions/paginateResults";
import { signUpForMeetupByJwt } from "../middleware/functions/signUpForMeetupByJwt";
import MeetupResponser from "../middleware/classes/meetupResponser";

const meetupsRouter = Router();

meetupsRouter.get(
  "/",
  validateRequestProperty("query", PaginationQueryParamsSchema),
  paginateResults(MeetupController.getAll, MeetupController.getAllLength)
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
