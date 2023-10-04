import { PrismaClient } from "@prisma/client";
import userRepository from "./user.repository";

export const database = new PrismaClient();
export * from "./user.repository";
