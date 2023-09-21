import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import meetupController from "../controllers/meetup.controller";
import { MEETUP_NOT_FOUND_RESPONSE } from "../../responses/responses";

export async function signUpForMeetupByJwt(req: Request, res: Response) {
  const { id } = jwt.decode(
    req.headers.authorization.slice(7)
  ) as jwt.JwtPayload;
  const meetupSignedUpFor = await meetupController.signUpForMeetup(
    req.params.id,
    id
  );
  if (!meetupSignedUpFor)
    res
      .status(MEETUP_NOT_FOUND_RESPONSE.statusCode)
      .json(MEETUP_NOT_FOUND_RESPONSE);
  else res.status(201).json(meetupSignedUpFor);
}
