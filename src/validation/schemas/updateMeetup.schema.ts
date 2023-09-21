import Joi from "joi";

export const UpdateMeetupSchema = Joi.object().keys({
  name: Joi.string().alphanum().max(40).optional(),
  description: Joi.string().alphanum().max(300).optional(),
  tags: Joi.array().items(Joi.string().alphanum()).max(10).optional(),
  time: Joi.string().isoDate().optional(),
  place: Joi.string().alphanum().max(40).optional(),
});
