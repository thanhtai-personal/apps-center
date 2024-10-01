import { ISearchQuery } from "@core-module/infra";

export interface INonPagingQuery<T> extends Omit<ISearchQuery<T>, "paging"> {}
