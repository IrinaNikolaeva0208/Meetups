import Joi from "joi";

export const MeetupIdSchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
});
