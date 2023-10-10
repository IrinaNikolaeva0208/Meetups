import { Request, Response, NextFunction } from "express";
import { channel } from "../rabbitmq";
import { ForbiddenError } from "@utils/errors";
import { Roles } from "@utils/interfaces/roles.enum";

export function hasRequiredRole(role: Roles) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      channel.sendToQueue(
        "check.role",
        Buffer.from(
          JSON.stringify({ authHeader: req.headers.authorization, role })
        )
      );

      let result;
      while (!result)
        result = await channel.get("result.role", { noAck: false });
      result = JSON.parse(result.content.toString());
      if (!result) throw ForbiddenError("Forbidden");

      next();
    } catch (err) {
      next(err);
    }
  };
}
