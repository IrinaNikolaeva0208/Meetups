import { Strategy, ExtractJwt } from "passport-jwt";
import { userRepository } from "@utils/repositories/user.repository";
import { UnauthorizedError } from "@utils/errors";

export function JwtStrategy(secretOrKey: string) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
  };

  return new Strategy(jwtOptions, async (jwtPayload, done) => {
    const userWithAcceptedJwt = await userRepository.findById(jwtPayload.id);

    if (!userWithAcceptedJwt) throw UnauthorizedError("Invalid token");
    done(null, userWithAcceptedJwt);
  });
}
