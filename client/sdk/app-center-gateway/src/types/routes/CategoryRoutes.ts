import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";
import {
  ICategoryCreation, ICategoryFilter
  , ICategoryResponse, ICategoryUpdating,
} from "@core-ui/recruiter-types";

export interface CategoryRoutes extends BaseRoutes {
  "/categories": {
    get: {
      request: {
        query: ICategoryFilter;
      };
      responses: {
        "200": IResponse<Pagination<ICategoryResponse>>;
      };
    };
    post: {
      request: {
        query: ICategoryCreation;
      };
      responses: {
        "200": IResponse<ICategoryResponse>;
      };
    };
  };
  "/categories/{categoryId}": {
    get: {
      request: {
        params: {
          categoryId: string | number;
        };
      };
      responses: {
        "200": IResponse<ICategoryResponse>;
      };
    };
    put: {
      request: {
        params: {
          categoryId: string | number;
        };
        body: ICategoryUpdating;
      };
      responses: {
        "200": IResponse<ICategoryResponse>;
      };
    };
    delete: {
      request: {
        params: {
          categoryId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          categoryId: string | number;
        };
        body: Partial<ICategoryUpdating>;
      };
      responses: {
        "200": IResponse<ICategoryResponse>;
      };
    };
  };
}
