import meetupsRepository from "./meetups.repository";
import { NotFoundError, BadRequestError } from "@responses/httpErrors";
import { CreateMeetupBody } from "@meetupInterfaces/createMeetupRequestOptions";
import { formPaginationOptions } from "./middleware/functions/formPaginationOptions";
import { getUserByJwt } from "./middleware/functions/getUserByJwt";

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

    const userId = getUserByJwt(authHeader).id;

    if (meetupToSignUp.users.find((item) => item.userId == userId))
      throw BadRequestError("Already signed up");

    const signupData = {
      data: {
        users: { create: { user: { connect: { id: userId } } } },
      },
      include: { users: { select: { userId: true } } },
    };

    return await meetupsRepository.updateById(meetupId, signupData);
  }

  async deleteById(id: string) {
    await this.getById(id);
    await meetupsRepository.deleteById(id);
  }

  async updateById(id: string, body) {
    await this.getById(id);

    const data = { ...body };
    if (data.time) data.time = new Date(body.time).toISOString();

    return await meetupsRepository.updateById(id, {
      data,
    });
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
