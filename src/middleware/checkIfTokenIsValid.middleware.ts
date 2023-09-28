import { NextFunction, Request, Response } from "express";
import passport from "../auth/passport/passport";
import { UnauthorizedError } from "@responses/httpErrors";

export default function checkIfTokenIsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "jwt-access",
    { session: false },
    (err, userPayload, info) => {
      try {
        if (err || !userPayload) throw UnauthorizedError(info.message);
        next();
      } catch (err) {
        next(err);
      }
    }
  )(req, res, next);
}
