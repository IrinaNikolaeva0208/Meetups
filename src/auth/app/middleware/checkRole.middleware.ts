import { getUserByJwt } from "./getUserByJwt";
import { logger } from "@utils/logger";
import { Roles } from "@utils/interfaces/roles.enum";

export function checkRole(authHeader: string, requiredRole: Roles) {
  try {
    const user = getUserByJwt(authHeader);
    return user.role == requiredRole;
  } catch (err) {
    logger.error(err);
  }
}
