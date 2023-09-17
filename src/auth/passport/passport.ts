import passport from "passport";
import LocalStrategy from "./strategies/local.strategy";
import createJwtStrategy from "./strategies/createJwtStrategy";

passport.use("local", LocalStrategy);
passport.use("jwt-access", createJwtStrategy(process.env.JWT_SECRET_KEY));
passport.use("jwt-refresh", createJwtStrategy(process.env.REFRESH_SECRET_KEY));

export default passport;
