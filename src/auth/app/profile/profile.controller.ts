import { NextFunction, Request, Response } from "express";
import { profileService } from "./profile.service";

export class ProfileController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    const requiredProfile = await profileService.findRequiredProfile(
      req.headers.authorization
    );
    res.status(200).send(requiredProfile);
  }

  static async updateProfle(req: Request, res: Response, next: NextFunction) {
    const updatedProfile = await profileService.updateUserProfile(
      req.headers.authorization,
      req.body
    );
    res.status(200).send(updatedProfile);
  }

  static async updatePhoto(req: Request, res: Response, next: NextFunction) {
    const updatedProfile = await profileService.updateUserProfile(
      req.headers.authorization,
      { photo: req.file.path }
    );
    res.status(200).send(updatedProfile);
  }
}
