import { Router } from "express";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { UserSchema } from "../../validation/schemas/user.schema";
import signUp from "../middleware/signUp";
import sendTokens from "../middleware/sendTokens";
import refreshAccessToken from "../middleware/refreshAccessToken";

const authRouter = Router();

authRouter.post("/signup", validateRequestProperty("body", UserSchema), signUp);
authRouter.post("/login", sendTokens);
authRouter.post("/refresh", refreshAccessToken);

export default authRouter;
