import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";
import {
  ICommentCreation, ICommentFilter
  , ICommentResponse, ICommentUpdating,
} from "@core-ui/novels-types";

export interface CommentRoutes extends BaseRoutes {
  "/comments": {
    get: {
      request: {
        query: ICommentFilter;
      };
      responses: {
        "200": IResponse<Pagination<ICommentResponse>>;
      };
    };
    post: {
      request: {
        query: ICommentCreation;
      };
      responses: {
        "200": IResponse<ICommentResponse>;
      };
    };
  };
  "/comments/{commentId}": {
    get: {
      request: {
        params: {
          commentId: string | number;
        };
      };
      responses: {
        "200": IResponse<ICommentResponse>;
      };
    };
    put: {
      request: {
        params: {
          commentId: string | number;
        };
        body: ICommentUpdating;
      };
      responses: {
        "200": IResponse<ICommentResponse>;
      };
    };
    delete: {
      request: {
        params: {
          commentId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          commentId: string | number;
        };
        body: Partial<ICommentUpdating>;
      };
      responses: {
        "200": IResponse<ICommentResponse>;
      };
    };
  };
}
