import { Strategy, ExtractJwt } from "passport-jwt";
import { database } from "../../../database/prisma.client";

export default function createJwtStrategy(secretOrKey: string) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
  };

  return new Strategy(jwtOptions, async (jwtPayload, done) => {
    const userWithAcceptedJwt = await database.user.findUnique({
      where: { id: jwtPayload.id },
    });

    if (userWithAcceptedJwt) {
      done(null, userWithAcceptedJwt);
    } else {
      done(null, false, { message: "Invalid token" });
    }
  });
}
