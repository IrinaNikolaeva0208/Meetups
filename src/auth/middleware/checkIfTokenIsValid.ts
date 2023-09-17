import { NextFunction, Request, Response } from "express";
import passport from "../passport/passport";

export default function checkIfTokenIsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "jwt-access",
    { session: false },
    (err, userPayload, info) => {
      if (err || !userPayload) {
        res.status(401).json({ message: info.message });
      } else next();
    }
  )(req, res, next);
}
