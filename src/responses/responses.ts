import { createResponse } from "./createResponse";

const LOGIN_IN_USE_RESPONSE = createResponse(409, "Login already in use");
const FORBIDDEN_RESPONSE = createResponse(403, "Forbidden");
const WRONG_CREDENTIALS_RESPONSE = createResponse(
  401,
  "Incorrect login or password"
);
const SUCCESSFULLY_DELETED_RESPONSE = createResponse(
  204,
  "Successfully deleted"
);
const MEETUP_NOT_FOUND_RESPONSE = createResponse(404, "Meetup not found");
const INVALID_JSON_SYNTAX_RESPONSE = createResponse(400, "Invalid JSON syntax");
const INVALID_TOKEN_RESPONSE = createResponse(400, "Invalid token");

export {
  INVALID_TOKEN_RESPONSE,
  INVALID_JSON_SYNTAX_RESPONSE,
  MEETUP_NOT_FOUND_RESPONSE,
  SUCCESSFULLY_DELETED_RESPONSE,
  FORBIDDEN_RESPONSE,
  WRONG_CREDENTIALS_RESPONSE,
  LOGIN_IN_USE_RESPONSE,
};
