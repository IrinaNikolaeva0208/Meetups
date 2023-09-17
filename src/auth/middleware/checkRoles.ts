import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function checkRoles(requiredRoles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const user = jwt.decode(
      req.headers.authorization.slice(7)
    ) as jwt.JwtPayload;
    const requiredRolesUserNotHave = requiredRoles.filter(
      (role) => !user.roles.includes(role)
    );
    if (requiredRolesUserNotHave.length) {
      res.status(403).send({ message: "Forbidden" });
    } else next();
  };
}
