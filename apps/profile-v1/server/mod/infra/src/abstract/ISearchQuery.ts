import { SortField } from "~/abstract/index.js";

type PrimitiveType = number | string | Date | boolean;
type ValueOrArray<T> = T extends PrimitiveType ? T | T[] : T;
export type ISearchQueryFilter<T> = Partial<{
  [K in keyof T]: ValueOrArray<T[K]>;
}>;
export interface ISearchQueryPaging {
  offset: number;
  limit: number;
}
export type ISearchQuerySort = SortField[];
export interface ISearchQuery<T> {
  filter?: ISearchQueryFilter<T>;
  paging?: ISearchQueryPaging;
  sortBy?: ISearchQuerySort;
  populate?: string[];
}
