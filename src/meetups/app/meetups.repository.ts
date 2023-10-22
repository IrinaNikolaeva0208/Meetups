import { PrismaClient } from "@prisma/client";
import { CreateMeetupBody } from "./interfaces";

const database = new PrismaClient();

class MeetupsRepository {
  async updateById(id: string, updateOptions: Partial<CreateMeetupBody>) {
    return await database.meetup.update({
      where: { id },
      data: updateOptions.time
        ? {
            ...updateOptions,
            time: new Date(updateOptions.time).toISOString(),
          }
        : { ...updateOptions },
    });
  }

  async create(requestBody: CreateMeetupBody) {
    return await database.meetup.create({
      data: {
        ...requestBody,
        time: new Date(requestBody.time).toISOString(),
      },
    });
  }

  async relateById(meetupId: string, userId: string) {
    await database.$executeRaw`
    INSERT INTO "meetupUser" VALUES (${userId}, ${meetupId})`;

    return await this.findById(meetupId);
  }

  async findById(id: string) {
    return await database.meetup.findUnique({
      where: { id },
      include: { users: { select: { userId: true } } },
    });
  }

  async deleteById(id: string) {
    await database.meetup.delete({
      where: { id },
    });
  }
}

export default new MeetupsRepository();
