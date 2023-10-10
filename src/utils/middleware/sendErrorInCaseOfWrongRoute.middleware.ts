import { BadRequestError } from "@utils/errors";

export function sendErrorInCaseOfWrongRoute(req, _, next) {
  next(BadRequestError(`Cannot ${req.method} ${req.originalUrl}`));
}
