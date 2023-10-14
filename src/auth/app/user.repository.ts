import { PrismaClient } from "@prisma/client";
import { Roles } from "@utils/interfaces/roles.enum";

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

  async addRole(id: string, role: Roles) {
    const { roles } = await this.findById(id);
    roles.push(role);
    return await database.user.update({
      where: { id },
      data: { roles },
    });
  }
}

export const userRepository = new UserRepository();
