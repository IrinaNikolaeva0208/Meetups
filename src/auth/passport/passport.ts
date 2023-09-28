import passport from "passport";
import { envVars } from "../../utils/environment";
import { localStrategy, JwtStrategy } from "./strategies";

passport.use("local", localStrategy);
passport.use("jwt-access", JwtStrategy(envVars.JWT_SECRET_KEY));
passport.use("jwt-refresh", JwtStrategy(envVars.REFRESH_SECRET_KEY));

export default passport;
