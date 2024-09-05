import { BaseSDK, IPagingFilter, IResponse, Pagination as PaginationCore } from "@core-sdk/core";
import {
  UserService,
} from "./services";
import {
  CreateApiConfig,
} from "./types";
import { APIResult } from "@core-ui/api-client";
import {
  IUserResponse,
  IUserCreation,
  IUserUpdating,
  IUserFilter,
} from "@core-ui/novals-types"

export class NovalsSDK extends BaseSDK {
  private static instance: NovalsSDK | null = null;
  private userService: UserService;

  private constructor(config: CreateApiConfig) {
    super(config);
    this.userService = new UserService(this.api);
  }

  public static getInstance = (config?: CreateApiConfig) => {
    if (!this.instance) {
      this.instance = new NovalsSDK(config || { apiEndpoint: "no-api-end-point" })
    }
    return this.instance;
  }


  getUserControl() {
    return {
      ...this.getBaseControl<
        IUserCreation,
        IUserUpdating,
        IUserResponse,
        IUserFilter & IPagingFilter
      >(this.userService),
    };
  }
}

export type Pagination<T> = PaginationCore<T>;

export * from "./types";
export default NovalsSDK;
