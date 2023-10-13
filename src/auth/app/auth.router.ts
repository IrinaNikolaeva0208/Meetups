import { Router } from "express";
import { validateRequestProperty } from "@utils/middleware";
import { CreateUserSchema, GoogleAuthSchema, LoginSchema } from "./schemas";
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
authRouter.post(
  "/google",
  validateRequestProperty("body", GoogleAuthSchema),
  AuthController.signInWithGoogle
);
authRouter.get("/google/callback", AuthController.getTokensFromGoogle);
authRouter.get("/logout", AuthController.logout);

export default authRouter;
