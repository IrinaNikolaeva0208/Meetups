import meetupsRepository from "./meetups.repository";
import { NotFoundError, BadRequestError } from "@utils/errors";
import { CreateMeetupBody } from "./interfaces";
import { formPaginationOptions } from "./helpers/formPaginationOptions";
import { channel } from "./rabbitmq";

class MeetupsService {
  async getPage(queryParams: Record<string, string>) {
    const paginationOptions = formPaginationOptions(queryParams);

    const results = await meetupsRepository.findMany(paginationOptions);

    return {
      data: results,
      pagination: {
        total: await meetupsRepository.getNumberOfFiltered({
          where: paginationOptions.where,
        }),
        ...queryParams,
      },
    };
  }

  async signUpFor(meetupId: string, authHeader: string) {
    const meetupToSignUp = await this.getById(meetupId);

    channel.sendToQueue("get.user", Buffer.from(authHeader));
    let userId;
    while (!userId) userId = await channel.get("result.user", { noAck: false });
    userId = JSON.parse(userId.content.toString()).id;

    if (meetupToSignUp.users.find((item) => item && item == userId))
      throw BadRequestError("Already signed up");

    return await meetupsRepository.relateById(meetupId, userId);
  }

  async deleteById(id: string) {
    await this.getById(id);
    await meetupsRepository.deleteById(id);
  }

  async updateById(id: string, body) {
    const meetupToUpdate = await this.getById(id);

    const data = { meetupToUpdate, ...body };
    if (body.time) data.time = new Date(body.time).toISOString();

    return await meetupsRepository.updateById(id, data);
  }

  async getById(id: string) {
    const meetupToGet = await meetupsRepository.findById(id);
    if (!meetupToGet) throw NotFoundError("Meetup not found");
    return meetupToGet;
  }

  async create(body: CreateMeetupBody) {
    return await meetupsRepository.create(body);
  }
}

export default new MeetupsService();
