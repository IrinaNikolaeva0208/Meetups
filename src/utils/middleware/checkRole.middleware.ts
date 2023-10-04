import { ForbiddenError } from "@utils/errors";
import { NextFunction, Request } from "express";
import { getUserByJwt } from "./getUserByJwt";

export function checkRole(requiredRole: string) {
  return function (req: Request, _, next: NextFunction) {
    try {
      const user = getUserByJwt(req.headers.authorization);

      if (user.role != requiredRole) throw ForbiddenError("Forbidden");
      next();
    } catch (err) {
      next(err);
    }
  };
}
