import { IPagingFilter } from "@ttt-sdk/core";

export interface UserFilter extends Partial<IPagingFilter> {
  id?: number | string;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  phoneNumber?: string;
}
