import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";
import {
  IAuthorCreation, IAuthorFilter
  , IAuthorResponse, IAuthorUpdating,
} from "@core-ui/novels-types";

export interface AuthorRoutes extends BaseRoutes {
  "/authors": {
    get: {
      request: {
        query: IAuthorFilter;
      };
      responses: {
        "200": IResponse<Pagination<IAuthorResponse>>;
      };
    };
    post: {
      request: {
        query: IAuthorCreation;
      };
      responses: {
        "200": IResponse<IAuthorResponse>;
      };
    };
  };
  "/authors/{authorId}": {
    get: {
      request: {
        params: {
          authorId: string | number;
        };
      };
      responses: {
        "200": IResponse<IAuthorResponse>;
      };
    };
    put: {
      request: {
        params: {
          authorId: string | number;
        };
        body: IAuthorUpdating;
      };
      responses: {
        "200": IResponse<IAuthorResponse>;
      };
    };
    delete: {
      request: {
        params: {
          authorId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          authorId: string | number;
        };
        body: Partial<IAuthorUpdating>;
      };
      responses: {
        "200": IResponse<IAuthorResponse>;
      };
    };
  };
}
