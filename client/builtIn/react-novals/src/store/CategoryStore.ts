import { ICategoryResponse, IPagination } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface ICategoryStore {
  error?: any;
  categories?: IPagination<ICategoryResponse>;
  category?: ICategoryResponse;
}

export class CategoryStore extends BaseStore implements ICategoryStore {
  public error?: any = null;
  public categories?: IPagination<ICategoryResponse>;
  public category?: ICategoryResponse;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      categories: observable,
      category: observable,
    });
  }
}