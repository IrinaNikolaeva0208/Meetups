import { Request, Response } from "express";
import userController from "../classes/userDatabaseController";
import { LOGIN_IN_USE_RESPONSE } from "../../../responses/responses";

export async function signUp(req: Request, res: Response) {
  const sameUser = await userController.getByLogin(req.body.login);
  if (sameUser)
    res.status(LOGIN_IN_USE_RESPONSE.statusCode).json(LOGIN_IN_USE_RESPONSE);
  else {
    const newUserPayload = await userController.create(req.body);
    delete newUserPayload.password;
    res.status(201).json(newUserPayload);
  }
}
