import Joi from "joi";

export const UpdateMeetupSchema = Joi.object().keys({
  name: Joi.string().max(40).optional(),
  description: Joi.string().max(300).optional(),
  tags: Joi.array().items(Joi.string()).max(10).optional(),
  time: Joi.date().optional(),
  place: Joi.string().max(40).optional(),
});
