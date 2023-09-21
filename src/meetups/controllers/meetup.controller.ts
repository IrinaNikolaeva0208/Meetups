import { database } from "../../database/prisma.client";
import { SUCCESSFULLY_DELETED_RESPONSE } from "../../responses/responses";
import { CreateMeetupBody } from "../interfaces/createMeetupRequestOptions";
import { PaginationFilter } from "../interfaces/paginationFilter";
import { paginationOptions } from "../interfaces/paginationOptions";
import { RequestOpions } from "../interfaces/requestOptions";

class MeetupController {
  async getAll(options: paginationOptions) {
    const allMeetups = await database.meetup.findMany(options);
    return allMeetups;
  }

  async getAllLength(filter: PaginationFilter) {
    const allMeetups = await database.meetup.count(filter);
    return allMeetups;
  }

  async signUpForMeetup(meetupId: string, userId: string) {
    const requiredMeetup = await this.getById({ id: meetupId });
    if (!requiredMeetup) return null;
    if (requiredMeetup.users.find((item) => item.userId == userId))
      return requiredMeetup;

    const meetupSignedUpFor = await database.meetup.update({
      where: { id: meetupId },
      data: {
        users: { create: { user: { connect: { id: userId } } } },
      },
      include: { users: { select: { userId: true } } },
    });
    return meetupSignedUpFor;
  }

  async update(requestOptions: RequestOpions) {
    const updatedMeetup = await database.meetup.update({
      where: { id: requestOptions.id },
      data: requestOptions.body.time
        ? {
            ...requestOptions.body,
            time: new Date(requestOptions.body.time).toISOString(),
          }
        : { ...requestOptions.body },
    });
    return updatedMeetup;
  }

  async getById(requestOptions: RequestOpions) {
    const meetupById = await database.meetup.findUnique({
      where: { id: requestOptions.id },
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

  async delete(requestOptions: RequestOpions) {
    const deletedMeetup = await database.meetup.delete({
      where: { id: requestOptions.id },
    });
  }
}

export default new MeetupController();
