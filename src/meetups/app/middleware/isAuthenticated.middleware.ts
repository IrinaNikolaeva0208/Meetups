import { Request, Response, NextFunction } from "express";
import { channel } from "../rabbitmq";
import { UnauthorizedError } from "@utils/errors";

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    channel.sendToQueue(
      "check.token",
      Buffer.from(JSON.stringify(req.headers.authorization))
    );

    let result;
    while (!result)
      result = await channel.get("result.token", { noAck: false });
    result = result.content.toString();
    if (result) throw UnauthorizedError(result);
    next();
  } catch (err) {
    next(err);
  }
}
