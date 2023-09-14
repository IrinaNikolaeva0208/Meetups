import passport from "passport";
import LocalStrategy from "./strategies/local.strategy";
import JwtStrategy from "./strategies/jwt.strategy";

passport.use("local", LocalStrategy);
passport.use("jwt", JwtStrategy);

export default passport;
