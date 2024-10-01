import { Role } from "~/entities";

export class UserCreate {
  email!: string;
  password?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  status!: string;
  roles!: Role[];
  socialId?: string;
  provider?: string;
}
