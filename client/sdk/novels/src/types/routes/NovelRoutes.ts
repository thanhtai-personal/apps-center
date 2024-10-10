import { BaseRoutes, Pagination, IResponse, IPagingFilter } from "@core-sdk/core";
import {
  INovelCreation, INovelFilter
  , INovelResponse, INovelUpdating,
} from "@core-ui/novels-types";

export interface NovelRoutes extends BaseRoutes {
  "/novels": {
    get: {
      request: {
        query: INovelFilter & IPagingFilter;
      };
      responses: {
        "200": IResponse<Pagination<INovelResponse>>;
      };
    };
    post: {
      request: {
        query: INovelCreation;
      };
      responses: {
        "200": IResponse<INovelResponse>;
      };
    };
  };
  "/novels/{novelId}": {
    get: {
      request: {
        params: {
          novelId: string | number;
        };
      };
      responses: {
        "200": IResponse<INovelResponse>;
      };
    };
    put: {
      request: {
        params: {
          novelId: string | number;
        };
        body: INovelUpdating;
      };
      responses: {
        "200": IResponse<INovelResponse>;
      };
    };
    delete: {
      request: {
        params: {
          novelId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          novelId: string | number;
        };
        body: Partial<INovelUpdating>;
      };
      responses: {
        "200": IResponse<INovelResponse>;
      };
    };
  };
  
  "/novels/ranking": {
    get: {
      request: {
        query: IPagingFilter;
      };
      responses: {
        "200": IResponse<{
          topVote: INovelResponse[];
          topView: INovelResponse[];
          topLike: INovelResponse[];
          topFollow: INovelResponse[];
        }>;
      };
    };
  };
}
