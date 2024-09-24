import { BaseSDK, IPagingFilter, IResponse, Pagination as PaginationCore } from "@core-sdk/core";
import {
  CategoryService,
  RoleService,
  UserService,
  JobService
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
  IJobsListingCreation,
  IJobsListingUpdating,
  IJobsListingResponse,
  IJobsListingFilter,
  IAuthorCreation,
  IAuthorFilter,
  IAuthorResponse,
  IAuthorUpdating,
  ICategoryCreation,
  ICategoryFilter,
  ICategoryResponse,
  ICategoryUpdating,
  IChapterCreation,
  IChapterFilter,
  IChapterResponse,
  IChapterUpdating,
  ICommentCreation,
  ICommentFilter,
  ICommentResponse,
  ICommentUpdating,
  IRoleCreation,
  IRoleFilter,
  IRoleResponse,
  IRoleUpdating,
} from "@core-ui/jobs-listing-types"

export class JobsListingsSDK extends BaseSDK {
  private static instance: JobsListingsSDK | null = null;
  private userService: UserService;
  private categoryService: CategoryService;
  private roleService: RoleService;
  private jobService: JobService;

  private constructor(config: CreateApiConfig) {
    super(config);
    this.userService = new UserService(this.api);
    this.categoryService = new CategoryService(this.api);
    this.roleService = new RoleService(this.api);
    this.jobService = new JobService(this.api);
  }

  public static getInstance = (config?: CreateApiConfig) => {
    if (!this.instance) {
      console.log("config", config)
      this.instance = new JobsListingsSDK(config || { apiEndpoint: "no-api-end-point" })
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

  getCategoryControl() {
    return {
      ...this.getBaseControl<
        ICategoryCreation,
        ICategoryUpdating,
        ICategoryResponse,
        ICategoryFilter & IPagingFilter
      >(this.categoryService),
    };
  }

  getRoleControl() {
    return {
      ...this.getBaseControl<
        IRoleCreation,
        IRoleUpdating,
        IRoleResponse,
        IRoleFilter & IPagingFilter
      >(this.roleService),
    };
  }

  getJobControl() {
    return {
      ...this.getBaseControl<
        any,
        any,
        any,
        any
      >(this.jobService),
    };
  }

}

export type Pagination<T> = PaginationCore<T>;

export * from "./types";
export default JobsListingsSDK;
