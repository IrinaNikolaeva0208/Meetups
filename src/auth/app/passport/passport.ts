import passport from "passport";
import { envVars } from "@utils/environment";
import { localStrategy, JwtStrategy, GoogleStrategy } from "./strategies";

passport.use("local", localStrategy);
passport.use("google", GoogleStrategy);
passport.use("jwt-refresh", JwtStrategy(envVars.REFRESH_SECRET_KEY));

export default passport;
