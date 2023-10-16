import Joi from "joi";

export const UploadPhotoSchema = Joi.object().keys({
  photo: Joi.binary(),
});
