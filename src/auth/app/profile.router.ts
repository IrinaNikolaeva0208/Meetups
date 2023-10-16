import { Router } from "express";
import { validateRequestProperty } from "@utils/middleware";
import { ProfileController } from "./profile.controller";
import { UpdateProfileSchema, UploadPhotoSchema } from "./schemas";
import { upload } from "./multer";

const profileRouter = Router();

profileRouter.get("/", ProfileController.getProfile);
profileRouter.patch(
  "/",
  validateRequestProperty("body", UpdateProfileSchema),
  ProfileController.updateProfle
);
profileRouter.patch(
  "/photo",
  validateRequestProperty("body", UploadPhotoSchema),
  upload.single("photo"),
  ProfileController.updatePhoto
);

export default profileRouter;
