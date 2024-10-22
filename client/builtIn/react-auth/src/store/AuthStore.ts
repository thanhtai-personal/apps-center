import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IAuthStore {
  error?: any;
  loading?: boolean;
  authData?: any;
}

export class AuthStore extends BaseStore implements IAuthStore {
  public error?: any = null;
  public authData?: any;
  public loading?: boolean = false; 

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      authData: observable,
      loading: observable,
    });
  }
}