import { IManyResult } from "./IManyResult.js";

export interface IPaginationResult<Resource> extends IManyResult<Resource> {
  offset: number;
  limit: number;
}
