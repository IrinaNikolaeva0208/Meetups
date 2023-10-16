import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage, Options } from "multer-storage-cloudinary";
import { envVars } from "@utils/environment";

cloudinary.config({
  cloud_name: envVars.CLOUDINARY_NAME,
  api_key: envVars.CLOUDINARY_KEY,
  api_secret: envVars.CLOUDINARY_SECRET,
});

export const cloudStorage = new CloudinaryStorage({
  cloudinary,
});
