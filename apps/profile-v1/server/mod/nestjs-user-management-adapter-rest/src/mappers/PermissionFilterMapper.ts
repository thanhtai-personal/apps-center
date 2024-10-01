import { PermissionFilter } from "@ttt-domain/user-management";
import { ISearchQueryFilter, SearchQueryMapper } from "@ttt-module/infra";
import { PermissionFilterParams } from "~/models";

export class PermissionFilterMapper extends SearchQueryMapper<
  PermissionFilterParams,
  PermissionFilter
> {
  where(source: PermissionFilterParams): ISearchQueryFilter<PermissionFilter> {
    const conditions: ISearchQueryFilter<PermissionFilter> = {};

    if (source.id) {
      conditions.id = source.id;
    }

    if (source.name) {
      conditions.name = source.name;
    }

    return conditions;
  }
}
