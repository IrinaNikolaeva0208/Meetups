import { Roles } from "@utils/interfaces/roles.enum";

export interface UserBody {
  login: string;
  password: string;
  roles?: Roles[];
}
