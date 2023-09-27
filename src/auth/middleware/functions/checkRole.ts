import { ForbiddenError } from "@responses/httpErrors";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function checkRole(requiredRole: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = jwt.decode(
      req.headers.authorization.slice(7)
    ) as jwt.JwtPayload;

    if (user.role != requiredRole) throw ForbiddenError("Forbidden");
    next();
  };
}
