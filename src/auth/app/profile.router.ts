import { Router } from "express";
import { validateRequestProperty } from "@utils/middleware";
import { ProfileController } from "./profile.controller";

const profileRouter = Router();

profileRouter.get("/", ProfileController.getProfile);
profileRouter.patch("/", ProfileController.updateProfle);

export default profileRouter;
