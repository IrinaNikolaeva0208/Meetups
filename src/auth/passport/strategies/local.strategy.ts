import userController from "../../controllers/user.controller";
import { IVerifyOptions, Strategy as LocalStrategy } from "passport-local";
import * as bcrypt from "bcrypt";
import { WRONG_CREDENTIALS_RESPONSE } from "../../../responses/responses";

export default new LocalStrategy(
  {
    usernameField: "login",
  },
  async (login, enteredPassword, done) => {
    try {
      const userWithSameLogin = await userController.getByLogin(login);

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
        const { password, ...userPayload } = userWithSameLogin;
        return done(null, userPayload);
      } else {
        return done(null, false, WRONG_CREDENTIALS_RESPONSE as IVerifyOptions);
      }
    } catch (error) {
      return done(error);
    }
  }
);
