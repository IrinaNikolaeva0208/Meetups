import { Router } from "express";
import { validateRequestProperty } from "../../validation/middleware/validateRequestProperty";
import { UserSchema } from "../../validation/schemas/user.schema";

const authRouter = Router();

authRouter.post("/signup", validateRequestProperty("body", UserSchema));
authRouter.post("/login");

export default authRouter;
