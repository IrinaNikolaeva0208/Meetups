import { Roles } from "../enums/roles";

export interface CreateUserBody {
  login: string;
  password: string;
  role: Roles;
}
