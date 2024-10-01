import { IPagingFilter } from "@ttt-sdk/core";

export interface RoleFilter extends Partial<IPagingFilter> {
  id?: number | string;
  name?: string;
}
