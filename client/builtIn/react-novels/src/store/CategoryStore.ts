import { ICategoryFilter, ICategoryResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface ICategoryStore {
  error?: any;
  categories?: IPagination<ICategoryResponse>;
  category?: ICategoryResponse;
  filterData?: ICategoryFilter  & IPagingFilter;
}

export class CategoryStore extends BaseStore implements ICategoryStore {
  public error?: any = null;
  public categories?: IPagination<ICategoryResponse>;
  public category?: ICategoryResponse;
  public filterData?: ICategoryFilter  & IPagingFilter;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      categories: observable,
      category: observable,
      filterData: observable,
    });
  }
}