import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "@utils/errors";
import passport from "../passport/passport";

export function hasValidAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "jwt-access",
    { session: false },
    (err, userPayload, info) => {
      try {
        if (err || !userPayload) throw UnauthorizedError("Invalid token");
        next();
      } catch (err) {
        next(err);
      }
    }
  )(req, res, next);
}
