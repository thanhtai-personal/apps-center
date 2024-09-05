import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";
import {
  INovalCreation, INovalFilter
  , INovalResponse, INovalUpdating,
} from "@core-ui/novals-types";

export interface NovalRoutes extends BaseRoutes {
  "/novals": {
    get: {
      request: {
        query: INovalFilter;
      };
      responses: {
        "200": IResponse<Pagination<INovalResponse>>;
      };
    };
    post: {
      request: {
        query: INovalCreation;
      };
      responses: {
        "200": IResponse<INovalResponse>;
      };
    };
  };
  "/novals/{novalId}": {
    get: {
      request: {
        params: {
          novalId: string | number;
        };
      };
      responses: {
        "200": IResponse<INovalResponse>;
      };
    };
    put: {
      request: {
        params: {
          novalId: string | number;
        };
        body: INovalUpdating;
      };
      responses: {
        "200": IResponse<INovalResponse>;
      };
    };
    delete: {
      request: {
        params: {
          novalId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          novalId: string | number;
        };
        body: Partial<INovalUpdating>;
      };
      responses: {
        "200": IResponse<INovalResponse>;
      };
    };
  };
}