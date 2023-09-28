import { Router } from "express";
import { validateRequestProperty } from "../middleware";
import { CreateUserSchema, LoginSchema } from "./schemas";
import { AuthController } from "./auth.controller";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequestProperty("body", CreateUserSchema),
  AuthController.signUp
);
authRouter.post(
  "/login",
  validateRequestProperty("body", LoginSchema),
  AuthController.login
);
authRouter.post("/refresh", AuthController.refreshToken);

export default authRouter;
