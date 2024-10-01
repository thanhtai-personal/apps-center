import { UserCreationBody } from "~/models";
import { Role as RoleEntity, UserCreate } from "@ttt-domain/user-management";
import { BaseMapper } from "@ttt-module/infra";

interface Options {
  roles: RoleEntity[];
  passwordHash: string;
}

export class UserCreationMapper extends BaseMapper<
  UserCreationBody,
  UserCreate,
  Options
> {
  map(source: UserCreationBody, options: Options): UserCreate {
    return {
      email: source.email,
      status: "registered",
      firstName: source.firstName,
      lastName: source.lastName,
      password: options.passwordHash,
      userName: source.email,
      roles: options.roles,
    };
  }
}
