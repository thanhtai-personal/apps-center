import { IRoleResponse, IPagination } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IRoleStore {
  error?: any;
  roles?: IPagination<IRoleResponse>;
  role?: IRoleResponse;
}

export class RoleStore extends BaseStore implements IRoleStore {
  public error?: any = null;
  public roles?: IPagination<IRoleResponse>;
  public role?: IRoleResponse;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      roles: observable,
      role: observable,
    });
  }
}