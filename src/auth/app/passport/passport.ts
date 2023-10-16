import passport from "passport";
import { envVars } from "@utils/environment";
import { localStrategy, JwtStrategy, GoogleStrategy } from "./strategies";

passport.use("local", localStrategy);
passport.use("google", GoogleStrategy);
passport.use("jwt-access", JwtStrategy(envVars.JWT_SECRET_KEY));
passport.use("jwt-refresh", JwtStrategy(envVars.REFRESH_SECRET_KEY));

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

export default passport;
