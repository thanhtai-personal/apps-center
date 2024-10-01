import {
  IManyResult,
  IPaginationResult,
  ISingleResult,
} from "@ttt-module/infra";
import { ManyResult, PaginationResult, SingleResult } from "~/models";

export class Result {
  static single<T>(data: T): ISingleResult<T> {
    return new SingleResult(data);
  }

  static empty(): void {
    return undefined;
  }

  static multiple<T>(
    data: T[],
    total: number,
    paging?: { offset: number; limit: number },
  ): IPaginationResult<T>;
  static multiple<T>(data: T[]): IManyResult<T>;
  static multiple<T>(
    data: T[],
    total?: number,
    paging?: { offset: number; limit: number },
  ) {
    if (total && paging) {
      return new PaginationResult(data, total, paging.offset, paging.limit);
    } else {
      return new ManyResult(data, data.length);
    }
  }
}
