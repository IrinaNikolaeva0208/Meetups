import passport from "passport";
import { database } from "../../database/prisma.client";
import * as passport_local from "passport-local";
import * as bcrypt from "bcrypt";

passport.use(
  "local",
  new passport_local.Strategy(
    {
      usernameField: "login",
    },
    async (login, enteredPassword, done) => {
      try {
        const userWithSameLogin = await database.user.findUnique({
          where: { login },
        });

        if (userWithSameLogin) {
          const passwordIsCorrect = await bcrypt.compare(
            enteredPassword,
            userWithSameLogin.password
          );

          if (!passwordIsCorrect) {
            return done(null, false, {
              message: "Incorrect login or password",
            });
          }
          const { password, ...userPayload } = userWithSameLogin;
          return done(null, userPayload);
        } else {
          return done(null, false, { message: "Incorrect login or password" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
