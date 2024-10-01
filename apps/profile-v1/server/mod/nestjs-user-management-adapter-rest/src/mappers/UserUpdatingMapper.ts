import { UserUpdate } from "@ttt-domain/user-management";
import { BaseMapper } from "@ttt-module/infra";
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
