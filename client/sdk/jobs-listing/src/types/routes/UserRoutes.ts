import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";
import {
  IUserCreation, IUserFilter
  , IUserResponse, IUserUpdating,
} from "@core-ui/jobs-listing-types";

export interface UserRoutes extends BaseRoutes {
  "/users": {
    get: {
      request: {
        query: IUserFilter;
      };
      responses: {
        "200": IResponse<Pagination<IUserResponse>>;
      };
    };
    post: {
      request: {
        query: IUserCreation;
      };
      responses: {
        "200": IResponse<IUserResponse>;
      };
    };
  };
  "/users/{userId}": {
    get: {
      request: {
        params: {
          userId: string | number;
        };
      };
      responses: {
        "200": IResponse<IUserResponse>;
      };
    };
    put: {
      request: {
        params: {
          userId: string | number;
        };
        body: IUserUpdating;
      };
      responses: {
        "200": IResponse<IUserResponse>;
      };
    };
    delete: {
      request: {
        params: {
          userId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          userId: string | number;
        };
        body: Partial<IUserUpdating>;
      };
      responses: {
        "200": IResponse<IUserResponse>;
      };
    };
  };
  "/auth/login": {
    post: {
      request: {
        query: any;
      };
      body: any;
      responses: {
        "200": IResponse<any>;
      };
    };
  };
}
