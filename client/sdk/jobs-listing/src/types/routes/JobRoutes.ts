import { BaseRoutes, Pagination, IResponse } from "@core-sdk/core";

export interface JobRoutes extends BaseRoutes {
  "/jobs": {
    get: {
      request: {
        query: any;
      };
      responses: {
        "200": IResponse<Pagination<any>>;
      };
    };
    post: {
      request: {
        query: any;
      };
      responses: {
        "200": IResponse<any>;
      };
    };
  };
  "/jobs/{jobId}": {
    get: {
      request: {
        params: {
          jobId: string | number;
        };
      };
      responses: {
        "200": IResponse<any>;
      };
    };
    put: {
      request: {
        params: {
          jobId: string | number;
        };
        body: any;
      };
      responses: {
        "200": IResponse<any>;
      };
    };
    delete: {
      request: {
        params: {
          jobId: string | number;
        };
      };
      responses: {
        "200": IResponse<string>;
      };
    };
    patch: {
      request: {
        params: {
          jobId: string | number;
        };
        body: any;
      };
      responses: {
        "200": IResponse<any>;
      };
    };
  };
  
  "/jobs/aniday": {
    post: {
      request: {
        body: { htmlString: string; jobId: string; };
      };
      responses: {
        "200": IResponse<any>;
      };
    };
  };
}
