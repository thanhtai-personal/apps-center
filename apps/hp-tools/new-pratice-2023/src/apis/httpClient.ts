import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  ParamsSerializerOptions,
} from "axios";
import _ from "lodash";
var qs = require("qs");

interface Window {
  token: string;
}

const paramsSerializer: ParamsSerializerOptions = {
  serialize: (params: any) => qs.stringify(params, { indices: false }),
};

export class HttpClient {
  private _agent: AxiosInstance;

  public constructor(options?: AxiosRequestConfig) {
    this._agent = axios.create(options);

    this._agent.interceptors.response.use((response: any) => ({
      ...response,
      data: response.data,
    }));
  }

  public get = async (url: string, params: object = {}) => {
    try {
      const response = await this._agent.get(url, {
        params,
        paramsSerializer,
      });

      return response;
    } catch (err: any) {
      if (err.response) {
        throw err.response;
      } else {
        throw err;
      }
    }
  };

  public post = async (url: string, data: object = {}) => {
    try {
      const response = await this._agent.post(url, data);
      return response;
    } catch (err: any) {
      if (err.response) {
        throw err.response;
      } else {
        throw err;
      }
    }
  };

  public patch = async (url: string, data: object = {}) => {
    try {
      const response = await this._agent.patch(url, data);
      return response;
    } catch (err: any) {
      if (err.response) {
        throw err.response;
      } else {
        throw err;
      }
    }
  };

  public put = async (url: string, data: object = {}) => {
    try {
      const response = await this._agent.put(url, data);
      return response;
    } catch (err: any) {
      if (err.response) {
        throw err.response;
      } else {
        throw err;
      }
    }
  };

  public delete = async (url: string, data: object = {}) => {
    try {
      const response = await this._agent.delete(url, data);
      return response;
    } catch (err: any) {
      if (err.response) {
        throw err.response;
      } else {
        throw err;
      }
    }
  };

  public setBaseURL = (url: string) => {
    this._agent.defaults.baseURL = url;
  };

  public setBearerToken = (token: string) => {
    window.localStorage.setItem("token", `${token}`);
    this._agent.defaults.headers.common["authorization"] = `${token}`;
  };

  public static buildParams = (obj: any) => {
    const res: Array<string> = [];
    if (_.isObject(obj)) {
      Object.keys(obj).forEach((k: string) => {
        let val: any;
        if (val === undefined || val === null) {
          val = "";
        }
        if (_.isArray(val)) {
          val = val.join(",");
        }
        res.push(`${k}=${val}`);
      });
    }
    return res.length > 0 ? `${res.join("&")}` : "";
  };
}

export const backendHttpClient = new HttpClient({
  baseURL: process.env.REACT_APP_API_URL,
});
