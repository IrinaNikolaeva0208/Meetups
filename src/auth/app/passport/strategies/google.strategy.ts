import { Strategy } from "passport-google-oauth20";
import { envVars } from "@utils/environment";
import { userRepository } from "../../user.repository";

export const GoogleStrategy = new Strategy(
  {
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    let user = await userRepository.findByProviderId(profile.id);
    if (user) {
      return done("Already exists", user);
    }

    const verifiedEmail =
      profile.emails.find((email) => email.verified) || profile.emails[0];

    const userData = {
      provider: profile.provider,
      providerId: profile.id,
      name: profile.name.givenName,
      email: verifiedEmail.value,
    };

    // const createdUser =
    //   (await userRepository.findByProviderId(profile.id)) ||
    //   (await userRepository.create(userData));

    return done(null, userData);
  }
);
