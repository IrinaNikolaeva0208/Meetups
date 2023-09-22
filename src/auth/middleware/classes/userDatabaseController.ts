import { database } from "@database/prisma.client";
import * as bcrypt from "bcrypt";
import { CreateUserBody } from "@authInterfaces/CreateUserBody";

class UserDatabaseController {
  async getById(id: string) {
    const userById = await database.user.findUnique({ where: { id } });
    return userById;
  }

  async getByLogin(login: string) {
    const userByLogin = await database.user.findUnique({ where: { login } });
    return userByLogin;
  }

  async create(body: CreateUserBody) {
    const createdUser = await database.user.create({
      data: {
        ...body,
        password: await bcrypt.hash(body.password, +process.env.CRYPT_SALT),
      },
    });
    return createdUser;
  }
}

export default new UserDatabaseController();
