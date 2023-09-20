import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import meetupController from "../controllers/meetup.controller";

export async function signUpForMeetupByJwt(req: Request, res: Response) {
  const { id } = jwt.decode(
    req.headers.authorization.slice(7)
  ) as jwt.JwtPayload;
  const meetupSignedUpFor = await meetupController.signUpForMeetup(
    req.params.id,
    id
  );
  if (!meetupSignedUpFor) res.status(404).json({ message: "Meetup not found" });
  else res.status(201).json(meetupSignedUpFor);
}
