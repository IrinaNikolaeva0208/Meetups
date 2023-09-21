import { database } from "../../../database/prisma.client";
import { CreateMeetupBody } from "../../interfaces/createMeetupRequestOptions";
import { PaginationFilter } from "../../interfaces/paginationFilter";
import { paginationOptions } from "../../interfaces/paginationOptions";
import { UpdateOptions } from "../../interfaces/updateOptions";

class MeetupDatabaseController {
  async getAll(options: paginationOptions) {
    const allMeetups = await database.meetup.findMany(options);
    return allMeetups;
  }

  async getAllNumber(filter: PaginationFilter) {
    const allMeetups = await database.meetup.count(filter);
    return allMeetups;
  }

  async update(id: string, updateOptions: UpdateOptions) {
    const updatedMeetup = await database.meetup.update({
      where: { id },
      ...updateOptions,
    });
    return updatedMeetup;
  }

  async getById(id: string) {
    const meetupById = await database.meetup.findUnique({
      where: { id },
      include: { users: { select: { userId: true } } },
    });
    return meetupById;
  }

  async create(requestBody: CreateMeetupBody) {
    const newMeetup = await database.meetup.create({
      data: {
        ...requestBody,
        time: new Date(requestBody.time).toISOString(),
      },
    });
    return newMeetup;
  }

  async delete(id: string) {
    const deletedMeetup = await database.meetup.delete({
      where: { id },
    });
  }
}

export default new MeetupDatabaseController();
