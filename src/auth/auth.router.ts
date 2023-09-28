import { Router } from "express";
import { validateRequestProperty } from "../middleware/validateRequestProperty.middleware";
import { CreateUserSchema } from "./schemas/createUser.schema";
import { LoginSchema } from "./schemas/login.schema";
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
