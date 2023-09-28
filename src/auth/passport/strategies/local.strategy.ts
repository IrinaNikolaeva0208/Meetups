import userRepository from "../../user.repository";
import { Strategy as LocalStrategy } from "passport-local";
import * as bcrypt from "bcrypt";

export const localStrategy = new LocalStrategy(
  {
    usernameField: "login",
  },
  async (login, enteredPassword, done) => {
    const userWithSameLogin = await userRepository.findByLogin(login);

    if (!userWithSameLogin) return done(true);

    const passwordIsCorrect = await bcrypt.compare(
      enteredPassword,
      userWithSameLogin.password
    );

    if (!passwordIsCorrect) return done(true);

    const userPayload = userWithSameLogin;
    delete userPayload.password;

    return done(null, userPayload);
  }
);
