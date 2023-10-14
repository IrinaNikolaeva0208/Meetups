import { NextFunction, Request, Response } from "express";
import authService from "./auth.service";
import passport from "./passport/passport";
import { ForbiddenError, UnauthorizedError } from "@utils/errors";
import { checkRole } from "./helpers";
import { Roles } from "@utils/interfaces/roles.enum";

export class AuthController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const signedUp = await authService.signUpUser(req.body);
      res.status(201).json(signedUp);
    } catch (err) {
      next(err);
    }
  }

  static login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "local",
      { session: false },
      async (error, userPayload) => {
        try {
          if (error) throw UnauthorizedError("Authorization Error");
          if (!userPayload) throw UnauthorizedError("Incorrect credentials");

          const tokens = await authService.signTokens(userPayload);

          res
            .status(200)
            .cookie("access", tokens.accessToken, { httpOnly: true })
            .cookie("refresh", tokens.refreshToken, { httpOnly: true })
            .json({ message: "Successfully logged in" });
        } catch (err) {
          next(err);
        }
      }
    )(req, res, next);
  }

  static signInWithGoogle(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("google", {
      scope: "profile",
      session: false,
    })(req, res, next);
  }

  static getTokensFromGoogle(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "google",
      {
        failureRedirect: "/auth/login",
      },
      async (error, userPayload) => {
        try {
          if (error) throw UnauthorizedError("Authorization Error");
          if (!userPayload) throw UnauthorizedError("Incorrect credentials");

          const tokens = await authService.signTokens(userPayload);

          res
            .status(200)
            .cookie("access", tokens.accessToken, { httpOnly: true })
            .cookie("refresh", tokens.refreshToken, { httpOnly: true })
            .json({ message: "Successfully logged in" });
        } catch (err) {
          next(err);
        }
      }
    )(req, res, next);
  }

  static refreshToken(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      "jwt-refresh",
      { session: false },
      async (err, userPayload, info) => {
        try {
          if (err || !userPayload) throw UnauthorizedError(info.message);

          const newAccessToken = await authService.refreshAccessToken(
            userPayload
          );

          res
            .status(200)
            .cookie("access", newAccessToken, { httpOnly: true })
            .json({ message: "Successfully refreshed" });
        } catch (err) {
          next(err);
        }
      }
    )(req, res, next);
  }

  static async makeUserOrganizer(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!checkRole(req.headers.authorization, Roles.admin))
        throw ForbiddenError("Admin role required");

      const newMeetupOrganizer = await authService.addOrganizerRoleToUserWithId(
        req.params.id
      );
      res.status(200).send(newMeetupOrganizer);
    } catch (err) {
      next(err);
    }
  }

  static logout(req: Request, res: Response) {
    res.clearCookie("access").clearCookie("refresh").sendStatus(200);
  }
}
