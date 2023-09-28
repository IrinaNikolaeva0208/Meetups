import Joi from "joi";

export const CreateUserSchema = Joi.object().keys({
  login: Joi.string().max(50).alphanum().required(),
  password: Joi.string().max(50).required(),
  role: Joi.string().valid("USER", "MEETUP_ORGANIZER").required(),
});
