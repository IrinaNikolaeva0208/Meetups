import { Request, Response } from "express";
import { createResponse } from "@responses/createResponse";

export function sendInvalidRouteResponse(req: Request, res: Response) {
  const response = createResponse(400, `Cannot ${req.method} ${req.url}`);
  res.status(response.statusCode).json(response);
}
