import { HttpErrorCode } from "@ttt-ui/api-client";
import { IErrorResponse } from "./IErrorResponse";

export interface IResponse<IDataResponse> {
  code?: HttpErrorCode | 200;
  message?: string;
  data: IDataResponse | IErrorResponse;
}
