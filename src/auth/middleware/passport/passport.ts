import passport from "passport";
import { envVars } from "@environment";
import LocalStrategy from "./strategies/local.strategy";
import JwtStrategy from "./strategies/JwtStrategy";

passport.use("local", LocalStrategy);
passport.use("jwt-access", JwtStrategy(envVars.JWT_SECRET_KEY));
passport.use("jwt-refresh", JwtStrategy(envVars.REFRESH_SECRET_KEY));

export default passport;
