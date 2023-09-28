import { logger } from "@utils/logger";

export function handleErrors(err, _, res, next) {
  if (res.headersSent) return next(err);

  const response = {
    statusCode: err.status || err.statusCode || 500,
    error: err,
  };

  res.status(response.statusCode).json(response);

  response.statusCode < 500 ? logger.warn(err) : logger.error(err);
}
