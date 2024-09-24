import { IUserFilter, IUserResponse, IPagination, IPagingFilter } from "@core-ui/jobs-listing-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IUserStore {
  error?: any;
  users?: IPagination<IUserResponse>;
  user?: IUserResponse;
  filterData?: IUserFilter & IPagingFilter;
}

export class UserStore extends BaseStore implements IUserStore {
  public error?: any = null;
  public users?: IPagination<IUserResponse>;
  public user?: IUserResponse;
  public filterData?: IUserFilter & IPagingFilter;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      users: observable,
      user: observable,
      filterData: observable,
    });
  }
}