import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import {
  paginationOptions,
  PaginationFilter,
  CreateMeetupBody,
} from "./interfaces";

const database = new PrismaClient();

class MeetupsRepository {
  async updateById(id: string, updateOptions: CreateMeetupBody) {
    await database.$executeRaw`
    UPDATE "Meetup"
    SET name = ${updateOptions.name},
        description = ${updateOptions.description},
        tags = ${updateOptions.tags},
        time = TO_TIMESTAMP(${
          updateOptions.time
        }, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
        coordinates = ST_MakePoint(${
          (updateOptions.longitude, updateOptions.latitude)
        }, 4236)
    WHERE id = ${id}`;

    return await this.findById(id);
  }

  async create(requestBody: CreateMeetupBody) {
    const newId = randomUUID();
    const meetupTimeIso = new Date(requestBody.time).toISOString();

    await database.$executeRaw`
    INSERT INTO "Meetup" VALUES (${newId}, ${requestBody.name}, ${
      requestBody.description
    }, ${
      requestBody.tags
    }, TO_TIMESTAMP(${meetupTimeIso}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), ST_MakePoint(${
      (requestBody.longitude, requestBody.latitude)
    }, 4236))`;

    return await this.findById(newId);
  }

  async relateById(meetupId: string, userId: string) {
    await database.$executeRaw`
    INSERT INTO "MeetupUser" VALUES (${userId}, ${meetupId})`;

    return await this.findById(meetupId);
  }

  async findById(id: string) {
    return (
      await database.$queryRaw`
      SELECT id, name, description, tags, time, CAST(coordinates AS text) AS coordinates, COALESCE(array_agg("userId"), ARRAY[]::text[]) AS users 
      FROM "Meetup" 
      LEFT JOIN "MeetupUser" on id = "meetupId"
      WHERE id = ${id}
      GROUP BY id`
    )[0];
  }

  async findMany(options: paginationOptions) {
    return await database.meetup.findMany(options);
  }

  async getNumberOfFiltered(filter: PaginationFilter) {
    return await database.meetup.count(filter);
  }

  async deleteById(id: string) {
    await database.$executeRaw`
    DELETE FROM "Meetup"
    WHERE id =${id}`;
  }
}

export default new MeetupsRepository();
