import Joi from "joi";

export const UpdateProfileSchema = Joi.object().keys({
  name: Joi.string().alphanum(),
});
