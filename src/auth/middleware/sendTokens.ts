import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "../passport/passport";

export default function sendTokens(
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

      const accessToken = jwt.sign(userPayload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
      });
      const refreshToken = jwt.sign(
        userPayload,
        process.env.REFRESH_SECRET_KEY,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
      );
      res.status(200).json({ accessToken, refreshToken });
    }
  )(req, res, next);
}
