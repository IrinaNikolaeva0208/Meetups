import { getUserByJwt } from "./getUserByJwt";
import { logger } from "@utils/logger";
import { Roles } from "@utils/interfaces/roles.enum";

export function checkRole(authHeader: string, requiredRole: Roles) {
  try {
    const user = getUserByJwt(authHeader);
    return user.roles.includes(requiredRole);
  } catch (err) {
    logger.error(err);
  }
}
