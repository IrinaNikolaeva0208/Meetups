import { Roles } from "@utils/interfaces/roles.enum";
import { NextFunction, Request, Response } from "express";
import { checkRole } from "./helpers";
import { ForbiddenError } from "@utils/errors";

export function hasRequiredRole(role?: Roles) {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const hasRole = checkRole(req.headers.authorization, role);
      if (!hasRole) throw ForbiddenError(`${role} role required`);
      next();
    } catch (err) {
      next(err);
    }
  };
}
