import { ValidationErrorItem } from "joi";

export function createResponse(
  statusCode: number,
  error: string | ValidationErrorItem[]
) {
  return { statusCode, error };
}
