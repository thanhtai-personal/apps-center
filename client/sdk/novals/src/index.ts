import { BaseSDK, IPagingFilter, IResponse, Pagination as PaginationCore } from "@core-sdk/core";
import {
  AuthService,
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
  IAuthResponse,
} from "@core-ui/novals-types"

export class GoatTapSDK extends BaseSDK {
  private static instance: GoatTapSDK | null = null;
  private userService: UserService;
  private authService: AuthService;


  private constructor(config: CreateApiConfig) {
    super(config);
    this.authService = new AuthService(this.api);
  }

  public static getInstance = (config?: CreateApiConfig) => {
    if (!this.instance) {
      this.instance = new GoatTapSDK(config || { apiEndpoint: "no-api-end-point" })
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
  async login(telegramId: string | number, referralParams?: string) {
    try {
      const rs: APIResult<IResponse<IAuthResponse>> = await this.authService.login({
        telegramId,
        referralParams
      });
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

  async getAuth() {
    try {
      const rs: APIResult<IResponse<IAuthResponse>> = await this.authService.auth();
      return this.handleApiResult(rs);
    } catch (error) {
      return this.handleErrorResult?.(error);
    }
  }

}

export type Pagination<T> = PaginationCore<T>;

export * from "./types";
export default GoatTapSDK;
