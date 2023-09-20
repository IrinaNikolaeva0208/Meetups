import { Router } from "express";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { CreateUserSchema } from "../../validation/schemas/createUser.schema";
import { LoginSchema } from "../../validation/schemas/loginSchema";
import signUp from "../middleware/signUp";
import sendTokens from "../middleware/sendTokens";
import refreshAccessToken from "../middleware/refreshAccessToken";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequestProperty("body", CreateUserSchema),
  signUp
);
authRouter.post(
  "/login",
  validateRequestProperty("body", LoginSchema),
  sendTokens
);
authRouter.post("/refresh", refreshAccessToken);

export default authRouter;
