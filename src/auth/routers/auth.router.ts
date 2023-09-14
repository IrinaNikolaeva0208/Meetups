import { Router } from "express";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { UserSchema } from "../../validation/schemas/user.schema";
import signUp from "../middleware/signUp";
import sendAuthenticationResponse from "../middleware/sendAuthenticationResponse";

const authRouter = Router();

authRouter.post("/signup", validateRequestProperty("body", UserSchema), signUp);
authRouter.post("/login", sendAuthenticationResponse("local"));
authRouter.post("/refresh", sendAuthenticationResponse("jwt-refresh"));

export default authRouter;
