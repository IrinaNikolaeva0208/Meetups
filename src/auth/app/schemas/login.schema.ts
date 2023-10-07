import Joi from "joi";

export const LoginSchema = Joi.object().keys({
  login: Joi.string().max(50).alphanum().required(),
  password: Joi.string().max(50).required(),
});
