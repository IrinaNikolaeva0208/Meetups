import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { createResponse } from "../../utils/responses/createResponse";

export function validateRequestProperty(
  property: keyof Request,
  schema: Joi.ObjectSchema
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const { error } = schema.validate(req[property]);
    if (!error) {
      next();
    } else {
      const response = createResponse(400, error.message);
      res.status(response.statusCode).json(response);
    }
  };
}
