import { Request, Response } from "express";
import { database } from "../database/prisma.client";

class MeetupController {
  async getAll(req: Request, res: Response) {
    const allMeetups = await database.meetup.findMany();
    res.status(200).json(allMeetups);
  }

  async getById(req: Request, res: Response) {
    const meetupById = await database.meetup.findUnique({
      where: { id: req.params.id },
    });
    if (meetupById) {
      res.status(200).json(meetupById);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  }

  async create(req: Request, res: Response) {
    const newMeetup = await database.meetup.create({ data: { ...req.body } });
    res.status(201).json(newMeetup);
  }

  async update(req: Request, res: Response) {
    const updatedMeetup = await database.meetup.update({
      where: { id: req.params.id },
      data: { ...req.body },
    });
    if (updatedMeetup) {
      res.status(200).json(updatedMeetup);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  }

  async delete(req: Request, res: Response) {
    const deletedMeetup = await database.meetup.delete({
      where: { id: req.params.id },
    });
    if (deletedMeetup) {
      res.sendStatus(204).json({ message: "Successfully deleted" });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  }
}

export default new MeetupController();
