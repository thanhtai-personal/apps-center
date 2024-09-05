import { IUserResponse, IPagination } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IUserStore {
  error?: any;
  users?: IPagination<IUserResponse>;
  user?: IUserResponse;
}

export class UserStore extends BaseStore implements IUserStore {
  public error?: any = null;
  public users?: IPagination<IUserResponse>;
  public user?: IUserResponse;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      users: observable,
      user: observable,
    });
  }
}