import { Strategy, ExtractJwt } from "passport-jwt";
import userController from "../../controllers/user.controller";

export default function createJwtStrategy(secretOrKey: string) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey,
  };

  return new Strategy(jwtOptions, async (jwtPayload, done) => {
    const userWithAcceptedJwt = await userController.getById(jwtPayload.id);

    if (userWithAcceptedJwt) {
      done(null, userWithAcceptedJwt);
    } else {
      done(null, false, { message: "Invalid token" });
    }
  });
}
