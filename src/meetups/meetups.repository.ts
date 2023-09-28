import { database } from "@database/prisma.client";
import { paginationOptions } from "@meetupInterfaces/paginationOptions";
import { PaginationFilter } from "@meetupInterfaces/paginationFilter";
import { CreateMeetupBody } from "@meetupInterfaces/createMeetupRequestOptions";
import { UpdateOptions } from "@meetupInterfaces/updateOptions";

class MeetupsRepository {
  async findById(id: string) {
    return await database.meetup.findUnique({
      where: { id },
      include: { users: { select: { userId: true } } },
    });
  }

  async findMany(options: paginationOptions) {
    return await database.meetup.findMany(options);
  }

  async getNumberOfFiltered(filter: PaginationFilter) {
    return await database.meetup.count(filter);
  }

  async create(requestBody: CreateMeetupBody) {
    return await database.meetup.create({
      data: {
        ...requestBody,
        time: new Date(requestBody.time).toISOString(),
      },
    });
  }
  async updateById(id: string, updateOptions: UpdateOptions) {
    return await database.meetup.update({
      where: { id },
      ...updateOptions,
    });
  }
  async deleteById(id: string) {
    await database.meetup.delete({
      where: { id },
    });
  }
}

export default new MeetupsRepository();
