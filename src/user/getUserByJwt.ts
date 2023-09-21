import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function getUserByJwt(req: Request, res: Response) {
  const currentUser = jwt.decode(
    req.headers.authorization.slice(7)
  ) as jwt.JwtPayload;
  res.status(200).json(currentUser);
}
