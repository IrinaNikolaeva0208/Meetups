import Joi from "joi";

export const CsvReportQuerySchema = Joi.object().keys({
  url: Joi.string().uri().optional(),
});
