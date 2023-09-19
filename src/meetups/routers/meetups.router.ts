import { Router } from "express";
import MeetupController from "../controllers/meetup.controller";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { CreateMeetupSchema } from "../../validation/schemas/createMeetup.schema";
import { UpdateMeetupSchema } from "../../validation/schemas/updateMeetup.schema";
import { MeetupIdSchema } from "../../validation/schemas/meetupId.schema";
import { checkRoles } from "../../auth/middleware/checkRoles";
import { Roles } from "../../auth/enums/roles";
import { PaginationQueryParamsSchema } from "../../validation/schemas/paginationQueryParams.schema";
import { paginateResults } from "../middleware/paginateResults";
import { signUpForMeetupByJwt } from "../middleware/signUpForMeetupByJwt";

const meetupsRouter = Router();

meetupsRouter.get(
  "/",
  validateRequestProperty("query", PaginationQueryParamsSchema),
  paginateResults(MeetupController.getAll, MeetupController.getAllLength)
);
meetupsRouter.post(
  "/",
  //checkRoles([Roles.meetup_organizer]),
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
  checkRoles([Roles.meetup_organizer]),
  validateRequestProperty("params", MeetupIdSchema),
  validateRequestProperty("body", UpdateMeetupSchema),
  MeetupController.update
);
meetupsRouter.delete(
  "/:id",
  checkRoles([Roles.meetup_organizer]),
  validateRequestProperty("params", MeetupIdSchema),
  MeetupController.delete
);
meetupsRouter.post(
  "/:id",
  validateRequestProperty("params", MeetupIdSchema),
  signUpForMeetupByJwt
);

export default meetupsRouter;
