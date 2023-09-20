import { Request, Response } from "express";

export function sendAppropriateResponse(requestToDatabase: Function) {
  return async function (req: Request, res: Response) {
    const databaseResponse = await requestToDatabase({
      id: req.params.id,
      body: req.body,
    });
    if (req.method == "POST") {
      res.status(201).json(databaseResponse);
    } else {
      if (!databaseResponse)
        res.status(404).json({ message: "Meetup not found" });
      else res.status(200).json(databaseResponse);
    }
  };
}
