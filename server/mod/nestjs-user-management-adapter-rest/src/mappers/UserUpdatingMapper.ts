import { UserUpdate } from "@core-domain/user-management";
import { BaseMapper } from "@core-module/infra";
import { UserUpdatingBody } from "~/models";

export class UserUpdatingMapper extends BaseMapper<
  UserUpdatingBody,
  UserUpdate
> {
  map(source: UserUpdatingBody): UserUpdate {
    return {
      ...source,
    };
  }
}
