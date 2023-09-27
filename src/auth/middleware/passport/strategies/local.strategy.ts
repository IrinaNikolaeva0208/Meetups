import UserDatabaseController from "@authClasses/userDatabaseController";
import { Strategy as LocalStrategy } from "passport-local";
import * as bcrypt from "bcrypt";
import { UnauthorizedError } from "@responses/httpErrors";

export default new LocalStrategy(
  {
    usernameField: "login",
  },
  async (login, enteredPassword, done) => {
    try {
      const userWithSameLogin = await UserDatabaseController.getByLogin(login);

      if (!userWithSameLogin)
        throw UnauthorizedError("Incorrect login or password");

      const passwordIsCorrect = await bcrypt.compare(
        enteredPassword,
        userWithSameLogin.password
      );

      if (!passwordIsCorrect)
        throw UnauthorizedError("Incorrect login or password");

      const userPayload = userWithSameLogin;
      delete userPayload.password;

      return done(null, userPayload);
    } catch (error) {
      return done(error);
    }
  }
);
