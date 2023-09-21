import { Request, Response, json } from "express";
import { createResponse } from "../../responses/createResponse";
import { INVALID_JSON_SYNTAX_RESPONSE } from "../../responses/responses";

export const validateJSON = json({
  verify: (req: Request, res: Response, buf: Buffer) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      res
        .status(INVALID_JSON_SYNTAX_RESPONSE.statusCode)
        .json(INVALID_JSON_SYNTAX_RESPONSE);
    }
  },
});
