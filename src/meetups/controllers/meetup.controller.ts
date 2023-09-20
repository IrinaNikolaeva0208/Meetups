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

  async getById(requestOptions: { id?: string; body?: object }) {
    const meetupById = await database.meetup.findUnique({
      where: { id: requestOptions.id },
      include: { users: { select: { userId: true } } },
    });
    return meetupById;
  }

  async create(requestOptions: { id?: string; body?: any }) {
    const newMeetup = await database.meetup.create({
      data: {
        ...requestOptions.body,
        time: new Date(requestOptions.body.time).toISOString(),
      },
    });
    return newMeetup;
  }

  async update(requestOptions: { id?: string; body?: any }) {
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

  async delete(requestOptions: { id?: string; body?: any }) {
    const deletedMeetup = await database.meetup.delete({
      where: { id: requestOptions.id },
    });
    if (deletedMeetup) return { message: "Successfully deleted" };
  }
}

export default new MeetupController();
