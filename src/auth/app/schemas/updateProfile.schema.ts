import Joi from "joi";

export const UpdateProfileSchema = Joi.object().keys({
  name: Joi.string().alphanum().min(2).max(20),
  age: Joi.number().integer().greater(0).less(120),
  sex: Joi.string().valid("MALE", "FEMALE"),
});
