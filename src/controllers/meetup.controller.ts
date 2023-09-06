import { Request, Response } from "express";
import { Database } from "../database/db";
import { randomUUID } from "crypto";

class MeetupController {
  async getAll(req: Request, res: Response) {
    res.status(200).json(Database);
  }

  async getById(req: Request, res: Response) {
    const meetupById = Database.find((item) => item.id == req.params.id);
    res.status(200).json(meetupById);
  }

  async create(req: Request, res: Response) {
    const newMeetup = { ...req.body, id: randomUUID() };
    Database.push(newMeetup);
    res.status(201).json(newMeetup);
  }

  async update(req: Request, res: Response) {
    const meetupIndex = Database.findIndex((item) => item.id == req.params.id);
    Database[meetupIndex] = { ...Database[meetupIndex], ...req.body };
    res.status(200).json(Database[meetupIndex]);
  }

  async delete(req: Request, res: Response) {
    const meetupIndex = Database.findIndex((item) => item.id == req.params.id);
    Database.splice(meetupIndex, 1);
    res.sendStatus(204);
  }
}

export default new MeetupController();
