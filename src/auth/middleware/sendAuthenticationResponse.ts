import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "../strategies/local.strategy";

export default function sendAuthenticationResponse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "local",
    { session: false },
    (err, userPayload, info) => {
      if (err) {
        next(err);
      }
      if (!userPayload) {
        res.status(401).json({ message: info.message });
      }

      const accessToken = jwt.sign(userPayload, process.env.JWT_SECRET_KEY);
      res.status(200).json({ accessToken });
    }
  )(req, res, next);
}
