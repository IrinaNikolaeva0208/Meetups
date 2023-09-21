import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "../passport/passport";
import { createResponse } from "../../../responses/createResponse";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "local",
    { session: false },
    (error, userPayload, info) => {
      if (error) next(error);
      else if (!userPayload) {
        const response = createResponse(401, info.message);
        res.status(response.statusCode).json(response);
      } else {
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
    }
  )(req, res, next);
}
