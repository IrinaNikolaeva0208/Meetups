import { Router } from "express";
import { validateRequestProperty } from "@utils/middleware";
import { CreateUserSchema, LoginSchema } from "./schemas";
import { AuthController } from "./auth.controller";
import { checkIfTokenIsValid, getUserByJwt } from "@utils/middleware";

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
authRouter.get("/user", checkIfTokenIsValid, getUserByJwt);

export default authRouter;
