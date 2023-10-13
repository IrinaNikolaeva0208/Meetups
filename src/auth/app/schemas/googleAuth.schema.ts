import Joi from "joi";

export const GoogleAuthSchema = Joi.object().keys({
  role: Joi.string().valid("USER", "MEETUP_ORGANIZER").required(),
});
