import { SortField } from "./IRepository.js";

export interface IPageable {
  offset: number;
  limit: number;
  sortBy?: SortField[];
}
