import { UserFilter } from "@ttt-domain/user-management";
import { SearchQueryMapper, ISearchQueryFilter } from "@ttt-module/infra";
import { UserFilterParams } from "~/models";

export class UserFilterMapper extends SearchQueryMapper<
  UserFilterParams,
  UserFilter
> {
  where(source: UserFilterParams): ISearchQueryFilter<UserFilter> {
    const conditions: ISearchQueryFilter<UserFilter> = {};

    if (source.id) {
      conditions.id = source.id;
    }

    if (source.email) {
      conditions.email = source.email;
    }

    if (source.firstName) {
      conditions.firstName = source.firstName;
    }

    if (source.lastName) {
      conditions.lastName = source.lastName;
    }

    if (source.phoneNumber) {
      conditions.phoneNumber = source.phoneNumber;
    }

    if (source.status) {
      conditions.status = source.status;
    }

    return conditions;
  }
}
