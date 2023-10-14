import { PrismaClient } from "@prisma/client";
import { logger } from "../src/utils/logger";
import bcrypt from "bcrypt";
import { envVars } from "../src/utils/environment";
import { Roles } from "../src/utils/interfaces/roles.enum";

const database = new PrismaClient();

async function main() {
  await database.user.create({
    data: {
      login: envVars.ADMIN_LOGIN,
      password: await bcrypt.hash(
        envVars.ADMIN_PASSWORD as string,
        +(envVars.CRYPT_SALT as string)
      ),
      role: Roles.admin,
    },
  });
}

main()
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
