import { INovalFilter, INovalResponse, IPagination, IPagingFilter } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface INovalStore {
  error?: any;
  novals?: IPagination<INovalResponse>;
  noval?: INovalResponse;
  filterData?: INovalFilter & IPagingFilter;
}

export class NovalStore extends BaseStore implements INovalStore {
  public error?: any = null;
  public novals?: IPagination<INovalResponse>;
  public noval?: INovalResponse;
  public filterData?: INovalFilter & IPagingFilter;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      novals: observable,
      noval: observable,
      filterData: observable,
    });
  }
}