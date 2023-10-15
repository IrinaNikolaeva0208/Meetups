import { Router } from "express";
import { validateRequestProperty } from "@utils/middleware";
import { ProfileController } from "./profile.controller";
import { UpdateProfileSchema } from "./schemas";

const profileRouter = Router();

profileRouter.get("/", ProfileController.getProfile);
profileRouter.patch(
  "/",
  validateRequestProperty("body", UpdateProfileSchema),
  ProfileController.updateProfle
);

export default profileRouter;
