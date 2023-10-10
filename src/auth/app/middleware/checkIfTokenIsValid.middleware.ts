import jwt from "jsonwebtoken";
import { userRepository } from "../user.repository";
import { envVars } from "@utils/environment";

export async function checkIfTokenIsValid(authHeader: string) {
  try {
    if (!authHeader) return "No access token provided";
    const user = jwt.verify(
      authHeader.slice(8, authHeader.length - 1),
      envVars.JWT_SECRET_KEY
    ) as jwt.JwtPayload;

    const userWithAcceptedJwt = await userRepository.findById(user.id);

    if (!userWithAcceptedJwt) return "Invalid token";
    return "";
  } catch (err) {
    return "Invalid token";
  }
}
