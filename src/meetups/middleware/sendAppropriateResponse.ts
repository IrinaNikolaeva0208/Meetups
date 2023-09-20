import { Request, Response } from "express";
import MeetupController from "../controllers/meetup.controller";

export function sendAppropriateResponse(requestToDatabase: Function) {
  return async function (req: Request, res: Response) {
    if (req.method == "POST") {
      const databaseResponse = await requestToDatabase({
        ...req.body,
      });
      res.status(201).json(databaseResponse);
    } else {
      const meetupById = await MeetupController.getById({ id: req.params.id });

      if (!meetupById) res.status(404).json({ message: "Meetup not found" });
      else {
        const databaseResponse = await requestToDatabase({
          id: req.params.id,
          body: req.body,
        });
        res.status(req.method == "DELETE" ? 204 : 200).json(databaseResponse);
      }
    }
  };
}
