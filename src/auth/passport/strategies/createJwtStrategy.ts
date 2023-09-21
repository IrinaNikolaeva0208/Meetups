import { Strategy, ExtractJwt } from "passport-jwt";
import userController from "../../controllers/user.controller";
import { INVALID_TOKEN_RESPONSE } from "../../../responses/responses";

export default function JwtStrategy(secretOrKey: string) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
  };

  return new Strategy(jwtOptions, async (jwtPayload, done) => {
    const userWithAcceptedJwt = await userController.getById(jwtPayload.id);

    if (userWithAcceptedJwt) {
      done(null, userWithAcceptedJwt);
    } else {
      done(null, false, INVALID_TOKEN_RESPONSE);
    }
  });
}
