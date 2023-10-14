import { Strategy } from "passport-google-oauth20";
import { envVars } from "@utils/environment";
import { userRepository } from "../../user.repository";
import { Roles } from "@utils/interfaces/roles.enum";

export const GoogleStrategy = new Strategy(
  {
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${envVars.GATEWAY_PORT}/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const userData = {
        provider: profile.provider,
        providerId: profile.id,
        name: profile.name.givenName,
        role: Roles.user,
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
