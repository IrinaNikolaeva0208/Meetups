import Joi from "joi";

export const UpdateMeetupSchema = Joi.object().keys({
  name: Joi.string().alphanum().max(40).optional(),
  description: Joi.string().max(300).optional(),
  tags: Joi.array().items(Joi.string().alphanum()).max(10).optional(),
  time: Joi.string().isoDate().optional(),
  latitude: Joi.number().min(-90).max(90).optional(),
  longtitude: Joi.number().min(-180).max(180).optional(),
});
