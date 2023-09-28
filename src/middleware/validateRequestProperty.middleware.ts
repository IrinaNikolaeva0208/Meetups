import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { BadRequestError } from "@responses/httpErrors";

export function validateRequestProperty(
  property: keyof Request,
  schema: Joi.ObjectSchema
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req[property]);
    if (error) throw BadRequestError(error.details);

    next();
  };
}
