import { BadRequestError } from "@responses/httpErrors";

export function sendErrorInCaseOfWrongRoute(req, _, next) {
  next(BadRequestError(`Cannot find ${req.originalUrl}`));
}
