import Joi from "joi";

export const PaginationQueryParamsSchema = Joi.object().keys({
  offset: Joi.number().min(0).required(),
  limit: Joi.number().min(1).required(),
  sort: Joi.string().valid("name", "time", "place"),
  order: Joi.string().valid("asc", "desc"),
  time: Joi.string().isoDate(),
  place: Joi.string().alphanum(),
  tags: Joi.string(),
  search: Joi.string().alphanum(),
});
