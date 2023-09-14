import { Router } from "express";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { UserSchema } from "../../validation/schemas/user.schema";
import signIn from "../signin";
import passport from "../strategies/local.strategy";
import sendAuthenticationResponse from "../middleware/sendAuthenticationResponse";

const authRouter = Router();

authRouter.post("/signup", validateRequestProperty("body", UserSchema), signIn);
authRouter.post("/login", sendAuthenticationResponse);

export default authRouter;
