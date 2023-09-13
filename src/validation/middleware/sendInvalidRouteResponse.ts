import { Request, Response } from "express";

export function sendInvalidRouteResponse(req: Request, res: Response) {
  res.status(404).json({ message: `Cannot ${req.method} ${req.url}` });
}