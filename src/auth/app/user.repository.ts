import { PrismaClient } from "@prisma/client";

export const database = new PrismaClient();

class UserRepository {
  async findById(id: string) {
    return await database.user.findUnique({ where: { id } });
  }

  async findByLogin(login: string) {
    return await database.user.findUnique({ where: { login } });
  }

  async create(body) {
    return await database.user.create({ data: body });
  }

  async findByProviderId(providerId: string) {
    return await database.user.findUnique({ where: { providerId } });
  }
}

export const userRepository = new UserRepository();
