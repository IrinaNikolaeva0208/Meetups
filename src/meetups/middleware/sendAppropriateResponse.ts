import { Request, Response } from "express";
import MeetupController from "../controllers/meetup.controller";
import {
  MEETUP_NOT_FOUND_RESPONSE,
  SUCCESSFULLY_DELETED_RESPONSE,
} from "../../responses/responses";

export function sendAppropriateResponse(requestToDatabase: Function) {
  return async function (req: Request, res: Response) {
    if (req.method == "POST") {
      const databaseResponse = await requestToDatabase({
        ...req.body,
      });
      res.status(201).json(databaseResponse);
    } else {
      const meetupById = await MeetupController.getById({ id: req.params.id });

      if (!meetupById)
        res
          .status(MEETUP_NOT_FOUND_RESPONSE.statusCode)
          .json(MEETUP_NOT_FOUND_RESPONSE);
      else {
        const databaseResponse = await requestToDatabase({
          id: req.params.id,
          body: req.body,
        });
        res
          .status(req.method == "DELETE" ? 204 : 200)
          .json(
            req.method == "DELETE"
              ? SUCCESSFULLY_DELETED_RESPONSE
              : databaseResponse
          );
      }
    }
  };
}
