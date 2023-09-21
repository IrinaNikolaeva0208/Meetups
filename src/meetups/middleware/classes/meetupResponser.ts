import { Request, Response } from "express";
import MeetupDatabaseController from "./meetupDatabaseController";
import {
  MEETUP_NOT_FOUND_RESPONSE,
  SUCCESSFULLY_DELETED_RESPONSE,
} from "../../../responses/responses";

export class MeetupResponser {
  async getMeetup(req: Request, res: Response) {
    const meetupToGet = await MeetupDatabaseController.getById(req.params.id);
    if (!meetupToGet)
      res
        .status(MEETUP_NOT_FOUND_RESPONSE.statusCode)
        .json(MEETUP_NOT_FOUND_RESPONSE);
    else res.status(200).json(meetupToGet);
  }

  async createMeetup(req: Request, res: Response) {
    const createdMeetup = await MeetupDatabaseController.create(req.body);
    res.status(201).json(createdMeetup);
  }

  async updateMeetup(req: Request, res: Response) {
    const meetupToUpdate = await MeetupDatabaseController.getById(
      req.params.id
    );
    if (!meetupToUpdate)
      res
        .status(MEETUP_NOT_FOUND_RESPONSE.statusCode)
        .json(MEETUP_NOT_FOUND_RESPONSE);
    else {
      const updatedMeetup = await MeetupDatabaseController.update(
        req.params.id,
        {
          data: { ...req.body, time: new Date(req.body.time).toISOString() },
        }
      );
      res.status(200).json(updatedMeetup);
    }
  }

  async deleteMeetup(req: Request, res: Response) {
    const meetupToDelete = await MeetupDatabaseController.getById(
      req.params.id
    );
    if (!meetupToDelete)
      res
        .status(MEETUP_NOT_FOUND_RESPONSE.statusCode)
        .json(MEETUP_NOT_FOUND_RESPONSE);
    else {
      await MeetupDatabaseController.delete(req.params.id);
      res
        .status(SUCCESSFULLY_DELETED_RESPONSE.statusCode)
        .json(SUCCESSFULLY_DELETED_RESPONSE);
    }
  }
}

export default new MeetupResponser();
