import authService from "../auth/auth.service";
import { Request, Response } from "express";

export class UserController {
  static getUser(req: Request, res: Response) {
    const user = authService.getUserByJwt(req.headers.authorization);
    res.status(200).json(user);
  }
}
