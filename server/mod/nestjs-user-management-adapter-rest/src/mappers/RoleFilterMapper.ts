import { RoleFilter } from "@core-domain/user-management";
import { ISearchQueryFilter, SearchQueryMapper } from "@core-module/infra";
import { RoleFilterParams } from "~/models";

export class RoleFilterMapper extends SearchQueryMapper<
  RoleFilterParams,
  RoleFilter
> {
  where(source: RoleFilterParams): ISearchQueryFilter<RoleFilter> {
    const conditions: ISearchQueryFilter<RoleFilter> = {};

    if (source.id) {
      conditions.id = source.id;
    }

    if (source.name) {
      conditions.name = source.name;
    }

    return conditions;
  }
}
