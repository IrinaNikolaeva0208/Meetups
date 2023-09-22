import { Roles } from "./roles.enum";

export interface CreateUserBody {
  login: string;
  password: string;
  role: Roles;
}
