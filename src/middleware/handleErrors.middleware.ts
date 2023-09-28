import { createResponse } from "@responses/createResponse";
import { logger } from "@logger";

export function handleErrors(err, _, res, next) {
  if (res.headersSent) return next(err);
  const response = createResponse(err.status || err.statusCode || 500, err);
  res.status(response.statusCode).json(response);
  response.statusCode < 500 ? logger.warn(err) : logger.error(err);
}
