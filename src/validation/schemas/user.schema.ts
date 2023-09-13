import Joi from "joi";

export const UserSchema = Joi.object().keys({
  login: Joi.string().max(50).required(),
  password: Joi.string().max(50).required(),
});
