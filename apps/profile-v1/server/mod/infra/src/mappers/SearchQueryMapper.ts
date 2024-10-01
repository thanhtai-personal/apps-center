import {
  IPageable,
  ISearchQuery,
  ISearchQueryFilter,
} from "~/abstract/index.js";

export abstract class SearchQueryMapper<
  Source extends IPageable,
  Filter extends object,
> {
  abstract where(source: Source): ISearchQueryFilter<Filter>;

  map(source: Source): ISearchQuery<Filter> {
    const query: ISearchQuery<Filter> = {};

    query.filter = this.where(source);

    if (source.offset !== undefined) {
      query.paging = { offset: source.offset, limit: source.limit ?? 10 };
    }

    if (source.sortBy) {
      query.sortBy = source.sortBy;
    }

    return query;
  }
}
