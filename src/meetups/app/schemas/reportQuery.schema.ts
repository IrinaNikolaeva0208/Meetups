import Joi from "joi";

export const ReportQuerySchema = Joi.object().keys({
  url: Joi.string().uri().optional(),
});
