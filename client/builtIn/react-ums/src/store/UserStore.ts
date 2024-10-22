import { IUserFilter, IUserResponse, IPagination, IPagingFilter } from "@core-ui/recruiter-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IUserStore {
  error?: any;
  users?: IPagination<IUserResponse>;
  user?: IUserResponse;
  loginData: any;
  filterData?: IUserFilter & IPagingFilter;
  loading?: boolean;
}

export class UserStore extends BaseStore implements IUserStore {
  public error?: any = null;
  public users?: IPagination<IUserResponse>;
  public user?: IUserResponse;
  public filterData?: IUserFilter & IPagingFilter;
  public loginData: any = {};
  public loading: boolean = false;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      users: observable,
      loading: observable,
      loginData: observable,
      user: observable,
      filterData: observable,
    });
  }
}