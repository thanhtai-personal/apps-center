import { BaseSDK, IPagingFilter, Pagination as PaginationCore } from "@core-sdk/core";
import {
  CategoryService,
  RoleService,
  UserService,
  JobService
} from "./services";
import {
  CreateApiConfig,
} from "./types";
import {
  IUserResponse,
  IUserCreation,
  IUserUpdating,
  IUserFilter,
  ICategoryCreation,
  ICategoryFilter,
  ICategoryResponse,
  ICategoryUpdating,
  IRoleCreation,
  IRoleFilter,
  IRoleResponse,
  IRoleUpdating,
} from "@core-ui/jobs-listing-types"

export class JobsListingSDK extends BaseSDK {
  private static instance: JobsListingSDK | null = null;
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
      this.instance = new JobsListingSDK(config || { apiEndpoint: "no-api-end-point" })
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

  exportAnydayJob(jobId: string, categoryId: number, htmlString: string) {
    return this.jobService.exportAnydayJob(jobId, categoryId, htmlString);
  }

  login(data: any) {
    return this.userService.login(data);
  }

}

export type Pagination<T> = PaginationCore<T>;

export * from "./types";
export default JobsListingSDK;
