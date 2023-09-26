import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { envVars } from "@environment";
import passport from "../passport/passport";
import { createResponse } from "@responses/createResponse";

export function refreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  passport.authenticate(
    "jwt-refresh",
    { session: false },
    (err, userPayload, info) => {
      if (err) {
        next(err);
      }
      if (!userPayload) {
        const response = createResponse(401, info.message);
        res.status(response.statusCode).json(response);
      }

      const accessToken = jwt.sign(userPayload, envVars.JWT_SECRET_KEY, {
        expiresIn: envVars.JWT_TOKEN_EXPIRES_IN,
      });
      res.status(200).json({ accessToken });
    }
  )(req, res, next);
}
