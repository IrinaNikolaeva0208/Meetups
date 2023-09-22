import UserDatabaseController from "../../classes/userDatabaseController";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import * as bcrypt from "bcrypt";
import { WRONG_CREDENTIALS_RESPONSE } from "../../../../utils/responses/responses";

export default new LocalStrategy(
  {
    usernameField: "login",
  },
  async (login, enteredPassword, done) => {
    try {
      const userWithSameLogin = await UserDatabaseController.getByLogin(login);

      if (userWithSameLogin) {
        const passwordIsCorrect = await bcrypt.compare(
          enteredPassword,
          userWithSameLogin.password
        );

        if (!passwordIsCorrect) {
          return done(
            null,
            false,
            WRONG_CREDENTIALS_RESPONSE as IVerifyOptions
          );
        }
        const userPayload = userWithSameLogin;
        delete userPayload.password;
        return done(null, userPayload);
      } else {
        return done(null, false, WRONG_CREDENTIALS_RESPONSE as IVerifyOptions);
      }
    } catch (error) {
      return done(error);
    }
  }
);
