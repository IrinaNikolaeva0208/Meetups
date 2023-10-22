import Joi from "joi";

export const FullTextSearchSchema = Joi.object().keys({
  contains: Joi.string().required(),
  offset: Joi.number().min(0).required(),
  limit: Joi.number().min(1).required(),
});
