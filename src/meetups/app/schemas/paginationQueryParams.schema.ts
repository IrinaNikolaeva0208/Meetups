import Joi from "joi";

export const PaginationQueryParamsSchema = Joi.object().keys({
  offset: Joi.number().min(0).required(),
  limit: Joi.number().min(1).required(),
  sort: Joi.string().valid("name", "time"),
  order: Joi.string().valid("asc", "desc").optional(),
  time: Joi.string().isoDate().optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longtitude: Joi.number().min(-180).max(180).optional(),
  tags: Joi.string().optional(),
  name: Joi.string().alphanum().optional(),
});
