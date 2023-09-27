import { Strategy, ExtractJwt } from "passport-jwt";
import UserDatabaseController from "@authClasses/userDatabaseController";
import { UnauthorizedError } from "@responses/httpErrors";

export default function JwtStrategy(secretOrKey: string) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
  };

  return new Strategy(jwtOptions, async (jwtPayload, done) => {
    const userWithAcceptedJwt = await UserDatabaseController.getById(
      jwtPayload.id
    );

    if (!userWithAcceptedJwt) throw UnauthorizedError("Invalid token");
    done(null, userWithAcceptedJwt);
  });
}
