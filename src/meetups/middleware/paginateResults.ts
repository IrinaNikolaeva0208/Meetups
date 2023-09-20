import { Request, Response } from "express";
import { formPaginationOptions } from "./formPaginationOptions";

export function paginateResults(
  getRequestResults: Function,
  getResultsLength: Function
) {
  return async function (req: Request, res: Response) {
    const paginationOptions = formPaginationOptions(req.query);

    const results = await getRequestResults(paginationOptions);

    const paginationResponse = {
      data: results,
      paginationData: {
        total: await getResultsLength({ where: paginationOptions.where }),
        ...req.query,
      },
    };

    res.status(200).json(paginationResponse);
  };
}
