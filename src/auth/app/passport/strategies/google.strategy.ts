import { Strategy } from "passport-google-oauth20";
import { envVars } from "@utils/environment";
import { userRepository } from "../../user.repository";

export const GoogleStrategy = new Strategy(
  {
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${envVars.GATEWAY_PORT}/auth/google/callback`,
    passReqToCallback: true,
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      const role = JSON.parse(
        decodeURIComponent(req.query.state as string)
      ).role;

      const userData = {
        provider: profile.provider,
        providerId: profile.id,
        name: profile.name.givenName,
        role,
      };

      const authorizedUser =
        (await userRepository.findByProviderId(profile.id)) ||
        (await userRepository.create(userData));

      return done(null, authorizedUser);
    } catch (err) {
      done(err);
    }
  }
);
