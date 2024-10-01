import { Permission, Role } from "~/entities";

interface IUserProperty {
  email: string;
  password: string;
  roles: Role[];
  permissions: Permission[];
  status: string;
}

export class UserPropertyUpdate {
  property!: keyof IUserProperty;
  value!: IUserProperty[keyof IUserProperty];
}
