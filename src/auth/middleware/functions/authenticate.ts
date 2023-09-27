import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { envVars } from "@environment";
import passport from "../passport/passport";
import { createResponse } from "@responses/createResponse";

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
        const accessToken = jwt.sign(userPayload, envVars.JWT_SECRET_KEY, {
          expiresIn: envVars.JWT_TOKEN_EXPIRES_IN,
        });

        const refreshToken = jwt.sign(userPayload, envVars.REFRESH_SECRET_KEY, {
          expiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
        });

        const response = createResponse(200, "Successfully logged in");
        res
          .status(response.statusCode)
          .cookie("access", accessToken, { httpOnly: true })
          .cookie("refresh", refreshToken, { httpOnly: true })
          .json(response);
      }
    }
  )(req, res, next);
}
