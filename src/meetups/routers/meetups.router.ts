import { Router } from "express";
import MeetupController from "../controllers/meetup.controller";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { CreateMeetupSchema } from "../../validation/schemas/createMeetup.schema";
import { UpdateMeetupSchema } from "../../validation/schemas/updateMeetup.schema";
import { MeetupIdSchema } from "../../validation/schemas/meetupId.schema";
import { checkRole } from "../../auth/middleware/checkRoles";
import { Roles } from "../../auth/enums/roles";
import { PaginationQueryParamsSchema } from "../../validation/schemas/paginationQueryParams.schema";
import { paginateResults } from "../middleware/paginateResults";
import { signUpForMeetupByJwt } from "../middleware/signUpForMeetupByJwt";
import { sendAppropriateResponse } from "../middleware/sendAppropriateResponse";

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
  sendAppropriateResponse(MeetupController.create)
);
meetupsRouter.get(
  "/:id",
  validateRequestProperty("params", MeetupIdSchema),
  sendAppropriateResponse(MeetupController.getById)
);
meetupsRouter.patch(
  "/:id",
  checkRole(Roles.meetup_organizer),
  validateRequestProperty("params", MeetupIdSchema),
  validateRequestProperty("body", UpdateMeetupSchema),
  sendAppropriateResponse(MeetupController.update)
);
meetupsRouter.delete(
  "/:id",
  checkRole(Roles.meetup_organizer),
  validateRequestProperty("params", MeetupIdSchema),
  sendAppropriateResponse(MeetupController.delete)
);
meetupsRouter.post(
  "/signup/:id",
  validateRequestProperty("params", MeetupIdSchema),
  signUpForMeetupByJwt
);

export default meetupsRouter;
