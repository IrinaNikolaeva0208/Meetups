import { Router } from "express";
import { validateRequestProperty } from "@utils/middleware";
import { UserIdSchema, UserInputSchema } from "./schemas";
import { AuthController } from "./auth.controller";
import { hasRequiredRole } from "./middleware";
import { Roles } from "@utils/interfaces/roles.enum";

const authRouter = Router();

authRouter.post(
  "/signup",
  validateRequestProperty("body", UserInputSchema),
  AuthController.signUp
);
authRouter.post(
  "/login",
  validateRequestProperty("body", UserInputSchema),
  AuthController.login
);
authRouter.post("/refresh", AuthController.refreshToken);
authRouter.get("/google", AuthController.signInWithGoogle);
authRouter.get("/google/callback", AuthController.getTokensFromGoogle);
authRouter.patch(
  "/add_organizer/:id",
  hasRequiredRole(Roles.admin),
  validateRequestProperty("params", UserIdSchema),
  AuthController.makeUserOrganizer
);
authRouter.get("/logout", AuthController.logout);

export default authRouter;
