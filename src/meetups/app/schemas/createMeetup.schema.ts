import Joi from "joi";

export const CreateMeetupSchema = Joi.object().keys({
  name: Joi.string().alphanum().max(40).required(),
  description: Joi.string().max(300).required(),
  tags: Joi.array().items(Joi.string().alphanum()).max(10).required(),
  time: Joi.string().isoDate().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longtitude: Joi.number().min(-180).max(180).required(),
});
