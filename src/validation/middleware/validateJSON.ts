import { Request, Response, json } from "express";

export const validateJSON = json({
  verify: (req: Request, res: Response, buf: Buffer) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      res.status(400).json({ message: "Invalid JSON syntax" });
    }
  },
});
