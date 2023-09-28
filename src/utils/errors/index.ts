import createError from "http-errors";

const BadRequestError = (message) => createError(400, message);
const NotFoundError = (message) => createError(404, message);
const ConflictError = (message) => createError(409, message);
const ForbiddenError = (message) => createError(403, message);
const UnauthorizedError = (message) => createError(401, message);

export {
  BadRequestError,
  NotFoundError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
};
