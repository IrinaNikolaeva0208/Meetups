import { NextFunction, Request, Response } from "express";
import passport from "../passport/passport";
import { createResponse } from "../../../utils/responses/createResponse";

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
        const response = createResponse(401, info.message);
        res.status(response.statusCode).json(response);
      } else next();
    }
  )(req, res, next);
}
