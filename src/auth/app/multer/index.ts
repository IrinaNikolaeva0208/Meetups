import { extname } from "path";
import multer from "multer";
import { BadRequestError } from "@utils/errors";
import { mkdir } from "fs";
import { logger } from "@utils/logger";

mkdir("./avatars", (err) => {
  if (err) logger.error(err);
  else logger.info("Avatars directory successfully created");
});

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./avatars/");
    },
    filename: function (req, file, cb) {
      const timestamp = Date.now();
      cb(null, file.fieldname + "-" + timestamp + extname(file.originalname));
    },
  }),

  fileFilter: function (req, file, callback) {
    const ext = extname(file.originalname).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(BadRequestError("Expected image"));
    }

    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
