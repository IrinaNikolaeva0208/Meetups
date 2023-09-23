import { ValidationErrorItem } from "joi";

export function createResponse(
  statusCode: number,
  message: string | ValidationErrorItem[]
) {
  return { statusCode, message };
}
