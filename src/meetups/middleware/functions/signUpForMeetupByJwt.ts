import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import MeetupDatabaseController from "../classes/meetupDatabaseController";
import { BadRequestError, NotFoundError } from "@responses/httpErrors";

export async function signUpForMeetupByJwt(req: Request, res: Response) {
  const { id } = jwt.decode(
    req.headers.authorization.slice(7)
  ) as jwt.JwtPayload;
  const meetupToSignUp = await MeetupDatabaseController.getById(req.params.id);
  if (!meetupToSignUp) throw NotFoundError("Meetup not found");
  if (meetupToSignUp.users.find((item) => item.userId == id))
    throw BadRequestError("Already signed up");
  const signupData = {
    data: {
      users: { create: { user: { connect: { id } } } },
    },
    include: { users: { select: { userId: true } } },
  };

  const meetupSignedUpFor = await MeetupDatabaseController.update(
    req.params.id,
    signupData
  );
  res.status(201).json(meetupSignedUpFor);
}
