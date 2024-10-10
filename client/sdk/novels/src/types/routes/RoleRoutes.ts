import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";
import {
  IRoleCreation, IRoleFilter
  , IRoleResponse, IRoleUpdating,
} from "@core-ui/novels-types";

export interface RoleRoutes extends BaseRoutes {
  "/roles": {
    get: {
      request: {
        query: IRoleFilter;
      };
      responses: {
        "200": IResponse<Pagination<IRoleResponse>>;
      };
    };
    post: {
      request: {
        query: IRoleCreation;
      };
      responses: {
        "200": IResponse<IRoleResponse>;
      };
    };
  };
  "/roles/{roleId}": {
    get: {
      request: {
        params: {
          roleId: string | number;
        };
      };
      responses: {
        "200": IResponse<IRoleResponse>;
      };
    };
    put: {
      request: {
        params: {
          roleId: string | number;
        };
        body: IRoleUpdating;
      };
      responses: {
        "200": IResponse<IRoleResponse>;
      };
    };
    delete: {
      request: {
        params: {
          roleId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          roleId: string | number;
        };
        body: Partial<IRoleUpdating>;
      };
      responses: {
        "200": IResponse<IRoleResponse>;
      };
    };
  };
}
