import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";
import {
  IChapterCreation, IChapterFilter
  , IChapterResponse, IChapterUpdating,
} from "@core-ui/novels-types";

export interface ChapterRoutes extends BaseRoutes {
  "/chapters": {
    get: {
      request: {
        query: IChapterFilter;
      };
      responses: {
        "200": IResponse<Pagination<IChapterResponse>>;
      };
    };
    post: {
      request: {
        query: IChapterCreation;
      };
      responses: {
        "200": IResponse<IChapterResponse>;
      };
    };
  };
  "/chapters/{chapterId}": {
    get: {
      request: {
        params: {
          chapterId: string | number;
        };
      };
      responses: {
        "200": IResponse<IChapterResponse>;
      };
    };
    put: {
      request: {
        params: {
          chapterId: string | number;
        };
        body: IChapterUpdating;
      };
      responses: {
        "200": IResponse<IChapterResponse>;
      };
    };
    delete: {
      request: {
        params: {
          chapterId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          chapterId: string | number;
        };
        body: Partial<IChapterUpdating>;
      };
      responses: {
        "200": IResponse<IChapterResponse>;
      };
    };
  };
}
