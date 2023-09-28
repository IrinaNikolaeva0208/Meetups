import { database } from "@utils/database";

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
}

export default new UserRepository();
