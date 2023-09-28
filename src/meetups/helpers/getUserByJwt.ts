import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export function getUserByJwt(authHeader: string) {
  const currentUser = jwt.decode(authHeader.slice(7)) as jwt.JwtPayload;
  delete currentUser.password;
  return currentUser;
}
