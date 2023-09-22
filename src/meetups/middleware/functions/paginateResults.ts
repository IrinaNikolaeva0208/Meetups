import { Request, Response } from "express";
import { formPaginationOptions } from "./formPaginationOptions";
import MeetupDatabaseController from "../classes/meetupDatabaseController";

export async function paginateAllMeetups(req: Request, res: Response) {
  const paginationOptions = formPaginationOptions(
    req.query as Record<string, string>
  );

  const results = await MeetupDatabaseController.getAll(paginationOptions);

  const paginationResponse = {
    data: results,
    pagination: {
      total: await MeetupDatabaseController.getAllNumber({
        where: paginationOptions.where,
      }),
      ...req.query,
    },
  };

  res.status(200).json(paginationResponse);
}
