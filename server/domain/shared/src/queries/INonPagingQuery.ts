import { ISearchQuery } from "@ttt-module/infra";

export interface INonPagingQuery<T> extends Omit<ISearchQuery<T>, "paging"> {}
