import { Request, Response } from "express";
import userController from "../controllers/user.controller";

export default async function signUp(req: Request, res: Response) {
  const sameUser = await userController.getByLogin(req.body.login);
  if (sameUser) res.status(409).json({ message: "Login is already in use" });
  else {
    const { password, ...newUserPayload } = await userController.create(
      req.body
    );
    res.status(201).json(newUserPayload);
  }
}
