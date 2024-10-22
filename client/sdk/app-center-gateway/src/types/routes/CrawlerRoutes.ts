import { BaseRoutes, IAPIResponse } from "@core-sdk/core";

export interface CrawlerRoutes extends BaseRoutes {
  "/anidays": {
    post: {
      request: {
      };
      responses: {
        "200": IAPIResponse<any>;
      };
    };
  };
}
