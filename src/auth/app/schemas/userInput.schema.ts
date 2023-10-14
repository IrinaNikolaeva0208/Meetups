import Joi from "joi";

export const UserInputSchema = Joi.object().keys({
  login: Joi.string().max(50).alphanum().required(),
  password: Joi.string().max(50).required(),
});
