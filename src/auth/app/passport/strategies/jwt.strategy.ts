import { Strategy, ExtractJwt } from "passport-jwt";
import { userRepository } from "../../user.repository";

export function JwtStrategy(secretOrKey: string) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
  };

  return new Strategy(jwtOptions, async (jwtPayload, done) => {
    const userWithAcceptedJwt = await userRepository.findById(jwtPayload.id);

    if (!userWithAcceptedJwt) done(true);
    done(null, userWithAcceptedJwt);
  });
}
