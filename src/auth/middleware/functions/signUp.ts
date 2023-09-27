import { Request, Response } from "express";
import userController from "../classes/userDatabaseController";
import { ConflictError } from "@responses/httpErrors";

export async function signUp(req: Request, res: Response) {
  const sameUser = await userController.getByLogin(req.body.login);
  if (sameUser) throw ConflictError("Login already in use");
  const newUserPayload = await userController.create(req.body);
  delete newUserPayload.password;
  res.status(201).json(newUserPayload);
}
