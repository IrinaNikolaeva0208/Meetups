import passport from "passport";
import LocalStrategy from "./strategies/local.strategy";
import JwtStrategy from "./strategies/JwtStrategy";

passport.use("local", LocalStrategy);
passport.use("jwt-access", JwtStrategy(process.env.JWT_SECRET_KEY));
passport.use("jwt-refresh", JwtStrategy(process.env.REFRESH_SECRET_KEY));

export default passport;
