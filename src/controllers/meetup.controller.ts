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
    res.status(200).json(meetupById);
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
    res.status(200).json(updatedMeetup);
  }

  async delete(req: Request, res: Response) {
    await database.meetup.delete({ where: { id: req.params.id } });
    res.sendStatus(204);
  }
}

export default new MeetupController();
