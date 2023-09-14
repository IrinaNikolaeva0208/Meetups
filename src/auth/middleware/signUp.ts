import { Request, Response } from "express";
import { database } from "../../database/prisma.client";
import * as bcrypt from "bcrypt";

export default async function signUp(req: Request, res: Response) {
  const sameUser = await database.user.findUnique({
    where: { login: req.body.login },
  });
  if (sameUser) res.status(409).json({ message: "Login is already in use" });
  else {
    const { password, ...newUserPayload } = await database.user.create({
      data: {
        ...req.body,
        password: await bcrypt.hash(req.body.password, +process.env.CRYPT_SALT),
      },
    });
    res.status(201).json(newUserPayload);
  }
}
