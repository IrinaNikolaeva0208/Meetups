import meetupsService from "./meetups.service";
import { NextFunction, Request, Response } from "express";

export class MeetupsController {
  static async getPageOfMeetups(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const meetupsPage = await meetupsService.getPage(
        req.query as Record<string, string>
      );
      res.status(200).json(meetupsPage);
    } catch (err) {
      next(err);
    }
  }

  static async getMeetupById(req: Request, res: Response, next: NextFunction) {
    let foundMeetup;
    try {
      foundMeetup = await meetupsService.getById(req.params.id);
      res.status(200).json(foundMeetup);
    } catch (err) {
      next(err);
    }
  }

  static async createMeetup(req: Request, res: Response) {
    const createdMeetup = await meetupsService.create(req.body);
    res.status(201).json(createdMeetup);
  }

  static async updateMeetup(req: Request, res: Response, next: NextFunction) {
    let updatedMeetup;
    try {
      updatedMeetup = await meetupsService.updateById(req.params.id, req.body);
      res.status(200).json(updatedMeetup);
    } catch (err) {
      next(err);
    }
  }

  static async signUpForMeetup(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let meetupSignedUpFor;
    try {
      meetupSignedUpFor = await meetupsService.signUpFor(
        req.params.id,
        req.headers.authorization
      );
      res.status(201).json(meetupSignedUpFor);
    } catch (err) {
      next(err);
    }
  }

  static async deleteMeetup(req: Request, res: Response, next: NextFunction) {
    let updatedMeetup;
    try {
      updatedMeetup = await meetupsService.deleteById(req.params.id);
      res.status(204).json(updatedMeetup);
    } catch (err) {
      next(err);
    }
  }
}
