import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export function validateRequestProperty(
  property: keyof Request,
  schema: Joi.ObjectSchema
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req[property]);
    if (!error) {
      next();
    } else {
      const { details } = error;
      res.status(400).json({ error: details });
    }
  };
}
