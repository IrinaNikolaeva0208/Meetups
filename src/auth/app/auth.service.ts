import { CreateUserBody } from "./interfaces";
import { userRepository } from "./user.repository";
import { ConflictError } from "@utils/errors";
import { envVars } from "@utils/environment";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthService {
  async signUpUser(body: CreateUserBody) {
    const sameUser = await userRepository.findByLogin(body.login);
    if (sameUser) throw ConflictError("Login already in use");

    const newUser = await userRepository.create({
      ...body,
      password: await bcrypt.hash(body.password, +envVars.CRYPT_SALT),
    });
    delete newUser.password;

    return newUser;
  }

  async signTokens(userPayload) {
    const accessToken = jwt.sign(userPayload, envVars.JWT_SECRET_KEY, {
      expiresIn: envVars.JWT_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(userPayload, envVars.REFRESH_SECRET_KEY, {
      expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async refreshAccessToken(userPayload) {
    const accessToken = jwt.sign(userPayload, envVars.JWT_SECRET_KEY, {
      expiresIn: envVars.JWT_TOKEN_EXPIRES_IN,
    });

    return accessToken;
  }
}

export default new AuthService();
