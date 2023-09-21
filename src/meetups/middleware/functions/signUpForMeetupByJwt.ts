import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import MeetupDatabaseController from "../classes/meetupDatabaseController";
import { MEETUP_NOT_FOUND_RESPONSE } from "../../../responses/responses";

export async function signUpForMeetupByJwt(req: Request, res: Response) {
  const meetupToSignUp = await MeetupDatabaseController.getById(req.params.id);
  if (!meetupToSignUp)
    res
      .status(MEETUP_NOT_FOUND_RESPONSE.statusCode)
      .json(MEETUP_NOT_FOUND_RESPONSE);
  else {
    const { id } = jwt.decode(
      req.headers.authorization.slice(7)
    ) as jwt.JwtPayload;

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
}
