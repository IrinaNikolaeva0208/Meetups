import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { CreateMeetupBody } from "./interfaces";

const database = new PrismaClient();

class MeetupsRepository {
  async updateById(id: string, updateOptions: CreateMeetupBody) {
    await database.$executeRaw`
    UPDATE "meetup"
    SET name = ${updateOptions.name},
        description = ${updateOptions.description},
        tags = ${updateOptions.tags},
        time = TO_TIMESTAMP(${
          updateOptions.time
        }, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'),
        longtitude = ${+updateOptions.longtitude},
        latitude = ${+updateOptions.latitude}
    WHERE id = ${id}`;

    return await this.findById(id);
  }

  async create(requestBody: CreateMeetupBody) {
    const newId = randomUUID();
    const meetupTimeIso = new Date(requestBody.time).toISOString();

    await database.$executeRaw`
    INSERT INTO "meetup" 
    VALUES (${newId}, ${requestBody.name}, ${requestBody.description},
    ${
      requestBody.tags
    }, TO_TIMESTAMP(${meetupTimeIso}, 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'), 
   ${+requestBody.longtitude}, ${+requestBody.latitude})`;

    return await this.findById(newId);
  }

  async relateById(meetupId: string, userId: string) {
    await database.$executeRaw`
    INSERT INTO "meetupUser" VALUES (${userId}, ${meetupId})`;

    return await this.findById(meetupId);
  }

  async findById(id: string) {
    return (
      await database.$queryRaw`
      SELECT id, name, description, tags, time,
             longtitude, latitude, 
             COALESCE(array_agg("userId"), ARRAY[]::text[]) AS users 
      FROM "meetup" 
      LEFT JOIN "meetupUser" on id = "meetupId"
      WHERE id = ${id}
      GROUP BY id`
    )[0];
  }

  async findMany(options: string, limit: number, offset: number) {
    return await database.$queryRawUnsafe(
      'SELECT * FROM "meetup" ' + options + " OFFSET $1 LIMIT $2",
      offset,
      limit
    );
  }

  async getNumberOfFiltered(filter: string) {
    const result = await database.$queryRawUnsafe(
      `SELECT CAST(COUNT(*) AS text) AS count FROM "meetup" ` + filter
    );
    return result[0].count;
  }

  async deleteById(id: string) {
    await database.$executeRaw`
    DELETE FROM "meetup"
    WHERE id =${id}`;
  }
}

export default new MeetupsRepository();
