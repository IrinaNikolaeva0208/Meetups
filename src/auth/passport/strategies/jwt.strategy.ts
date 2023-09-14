import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { database } from "../../../database/prisma.client";

const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};

export default new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  const userWithAcceptedJwt = await database.user.findUnique({
    where: { id: jwtPayload.id },
  });

  if (userWithAcceptedJwt) {
    done(null, userWithAcceptedJwt);
  } else {
    done(null, false, { message: "Invalid token" });
  }
});
