import { Router } from "express";
import { validateRequestProperty } from "@validators/validateRequestProperty";
import { CreateUserSchema } from "@schemas/createUser.schema";
import { LoginSchema } from "@schemas/loginSchema";
import { signUp } from "../middleware/functions/signUp";
import { authenticate } from "../middleware/functions/authenticate";
import { refreshAccessToken } from "../middleware/functions/refreshAccessToken";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequestProperty("body", CreateUserSchema),
  signUp
);
authRouter.post(
  "/login",
  validateRequestProperty("body", LoginSchema),
  authenticate
);
authRouter.post("/refresh", refreshAccessToken);

export default authRouter;
