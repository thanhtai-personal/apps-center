import { IPagingFilter } from "@ttt-sdk/core";
export interface PermissionFilter extends Partial<IPagingFilter> {
  id?: number;
  name?: string;
}
