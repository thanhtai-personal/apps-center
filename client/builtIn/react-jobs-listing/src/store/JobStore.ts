import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IJobStore {
  error?: any;
  jobs?: any;
  filterData?: any;
  loading?: boolean;
  pagingFilterData?: any;
}

export class JobStore extends BaseStore implements IJobStore {
  public error?: any = null;
  public jobs?: any;
  public pagingFilterData?: any;
  public filterData?: any;
  public job?: any;
  public loading?: boolean = false; 

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      jobs: observable,
      filterData: observable,
      job: observable,
      loading: observable,
      pagingFilterData: observable,
    });
  }
}