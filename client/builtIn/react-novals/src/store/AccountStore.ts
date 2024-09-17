import { IUserResponse } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IAccountStore {
  isAuthenticated: boolean;
  error?: any;
  accessToken?: string;
  isLoading?: boolean;
  account?: IUserResponse;
  requestLoginSent?: boolean;
  socialData?: any;
}

export class AccountStore extends BaseStore implements IAccountStore {
  public isAuthenticated: boolean = false;
  public error?: any = null;
  public accessToken?: string;
  public isLoading?: boolean = true;
  public account?: IUserResponse;
  public requestLoginSent?: boolean = false;
  public socialData?: any = null;

  constructor() {
    super();
    makeObservable(this, {
      isAuthenticated: observable,
      account: observable,
      error: observable,
      accessToken: observable,
      isLoading: observable,
      socialData: observable,
      requestLoginSent: observable,
    });
  }
}