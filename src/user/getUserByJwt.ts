import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function getUserByJwt(req: Request, res: Response, next: NextFunction) {
  const currentUser = jwt.decode(
    req.headers.authorization.slice(7)
  ) as jwt.JwtPayload;
  res.status(200).json(currentUser);
}
