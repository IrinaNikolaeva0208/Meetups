import { ForbiddenError } from "@responses/httpErrors";
import { NextFunction, Request } from "express";
import authService from "../auth/auth.service";

export function checkRole(requiredRole: string) {
  return function (req: Request, _, next: NextFunction) {
    try {
      const user = authService.getUserByJwt(req.headers.authorization);

      if (user.role != requiredRole) throw ForbiddenError("Forbidden");
      next();
    } catch (err) {
      next(err);
    }
  };
}
