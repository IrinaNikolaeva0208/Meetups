import { Request, Response } from "express";
import userController from "../controllers/user.controller";
import { LOGIN_IN_USE_RESPONSE } from "../../responses/responses";

export default async function signUp(req: Request, res: Response) {
  const sameUser = await userController.getByLogin(req.body.login);
  if (sameUser)
    res.status(LOGIN_IN_USE_RESPONSE.statusCode).json(LOGIN_IN_USE_RESPONSE);
  else {
    const { password, ...newUserPayload } = await userController.create(
      req.body
    );
    res.status(201).json(newUserPayload);
  }
}
