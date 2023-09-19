import { Request, Response } from "express";
import { database } from "../../database/prisma.client";

class MeetupController {
  async getAll(options: any) {
    const allMeetups = await database.meetup.findMany(options);
    return allMeetups;
  }

  async getAllLength(filter: any) {
    const allMeetups = await database.meetup.count(filter);
    return allMeetups;
  }

  async signUpForMeetup(meetupId: string, userId: string) {
    const requiredMeetup = await this.getById(meetupId);
    if (!requiredMeetup) return null;
    if (requiredMeetup.users.includes({ userId })) return requiredMeetup;
    const meetupSignedUpFor = await database.meetup.update({
      where: { id: meetupId },
      data: {
        users: { create: { user: { connect: { id: userId } } } },
      },
      include: { users: { select: { userId: true } } },
    });
    return meetupSignedUpFor;
  }

  async getById(id: string) {
    const meetupById = await database.meetup.findUnique({
      where: { id },
      include: { users: { select: { userId: true } } },
    });
    return meetupById;
  }

  async create(req: Request, res: Response) {
    const newMeetup = await database.meetup.create({
      data: { ...req.body, time: new Date(req.body.time).toISOString() },
    });
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
