import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { FORBIDDEN_RESPONSE } from "../../../responses/responses";

export function checkRole(requiredRole: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = jwt.decode(
      req.headers.authorization.slice(7)
    ) as jwt.JwtPayload;

    if (user.role != requiredRole) {
      res.status(FORBIDDEN_RESPONSE.statusCode).send(FORBIDDEN_RESPONSE);
    } else next();
  };
}
