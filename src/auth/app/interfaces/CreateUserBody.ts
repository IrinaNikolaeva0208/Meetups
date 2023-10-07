import { Roles } from "@utils/interfaces/roles.enum";

export interface CreateUserBody {
  login: string;
  password: string;
  role: Roles;
}
