import { BaseSDK, IPagingFilter, IResponse, Pagination as PaginationCore } from "@core-sdk/core";
import {
  AuthorService,
  CategoryService,
  ChapterService,
  CommentService,
  NovelService,
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
  INovelCreation,
  INovelUpdating,
  INovelResponse,
  INovelFilter,
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
} from "@core-ui/novels-types"

export class NovelsSDK extends BaseSDK {
  private static instance: NovelsSDK | null = null;
  private userService: UserService;
  private novelService: NovelService;
  private chapterService: ChapterService;
  private authorService: AuthorService;
  private commentService: CommentService;
  private categoryService: CategoryService;
  private roleService: RoleService;
  private jobService: JobService;

  private constructor(config: CreateApiConfig) {
    super(config);
    this.userService = new UserService(this.api);
    this.novelService = new NovelService(this.api);
    this.chapterService = new ChapterService(this.api);
    this.authorService = new AuthorService(this.api);
    this.commentService = new CommentService(this.api);
    this.categoryService = new CategoryService(this.api);
    this.roleService = new RoleService(this.api);
    this.jobService = new JobService(this.api);
  }

  public static getInstance = (config?: CreateApiConfig) => {
    if (!this.instance) {
      console.log("config", config)
      this.instance = new NovelsSDK(config || { apiEndpoint: "no-api-end-point" })
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

  getNovelControl() {
    return {
      ...this.getBaseControl<
        INovelCreation,
        INovelUpdating,
        INovelResponse,
        INovelFilter & IPagingFilter
      >(this.novelService),
    };
  }

  getChapterControl() {
    return {
      ...this.getBaseControl<
        IChapterCreation,
        IChapterUpdating,
        IChapterResponse,
        IChapterFilter & IPagingFilter
      >(this.chapterService),
    };
  }

  getAuthorControl() {
    return {
      ...this.getBaseControl<
        IAuthorCreation,
        IAuthorUpdating,
        IAuthorResponse,
        IAuthorFilter & IPagingFilter
      >(this.authorService),
    };
  }

  getCommentControl() {
    return {
      ...this.getBaseControl<
        ICommentCreation,
        ICommentUpdating,
        ICommentResponse,
        ICommentFilter & IPagingFilter
      >(this.commentService),
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

  getRankingNovels(filter: IPagingFilter) {
    return this.novelService.getRanking(filter);
  }
}

export type Pagination<T> = PaginationCore<T>;

export * from "./types";
export default NovelsSDK;
