import Joi from "joi";

export const CreateMeetupSchema = Joi.object().keys({
  name: Joi.string().max(40).required(),
  description: Joi.string().max(300).required(),
  tags: Joi.array().items(Joi.string()).max(10).required(),
  time: Joi.string().isoDate().required(),
  place: Joi.string().max(40).required(),
});
