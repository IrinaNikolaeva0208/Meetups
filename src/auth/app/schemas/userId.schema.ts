import Joi from "joi";

export const UserIdSchema = Joi.object().keys({
  id: Joi.string().uuid().required(),
});
