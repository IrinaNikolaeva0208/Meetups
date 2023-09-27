import { Request, Response } from "express";
import MeetupDatabaseController from "./meetupDatabaseController";
import { NotFoundError } from "@responses/httpErrors";

export class MeetupResponser {
  async getMeetup(req: Request, res: Response) {
    const meetupToGet = await MeetupDatabaseController.getById(req.params.id);
    if (!meetupToGet) throw NotFoundError("Meetup not found");
    res.status(200).json(meetupToGet);
  }

  async createMeetup(req: Request, res: Response) {
    const createdMeetup = await MeetupDatabaseController.create(req.body);
    res.status(201).json(createdMeetup);
  }

  async updateMeetup(req: Request, res: Response) {
    const meetupToUpdate = await MeetupDatabaseController.getById(
      req.params.id
    );
    if (!meetupToUpdate) throw NotFoundError("Meetup not found");
    const updatedMeetup = await MeetupDatabaseController.update(req.params.id, {
      data: { ...req.body, time: new Date(req.body.time).toISOString() },
    });
    res.status(200).json(updatedMeetup);
  }

  async deleteMeetup(req: Request, res: Response) {
    const meetupToDelete = await MeetupDatabaseController.getById(
      req.params.id
    );
    if (!meetupToDelete) throw NotFoundError("Meetup not found");
    await MeetupDatabaseController.delete(req.params.id);
    res.status(204).json({ message: "Successfully deleted" });
  }
}

export default new MeetupResponser();
