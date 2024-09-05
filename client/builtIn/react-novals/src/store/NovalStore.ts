import { INovalResponse, IPagination } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface INovalStore {
  error?: any;
  novals?: IPagination<INovalResponse>;
  noval?: INovalResponse;
}

export class NovalStore extends BaseStore implements INovalStore {
  public error?: any = null;
  public novals?: IPagination<INovalResponse>;
  public noval?: INovalResponse;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      novals: observable,
      noval: observable,
    });
  }
}