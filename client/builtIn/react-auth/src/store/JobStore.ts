import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IJobStore {
  error?: any;
  jobs?: any;
  job?: any;
  savedJobs?: any;
  selectedJobs?: any;
  filterData: any;
  loading?: boolean;
  pagingFilterData?: any;
}

export class JobStore extends BaseStore implements IJobStore {
  public error?: any = null;
  public jobs?: any;
  public savedJobs?: any = [];
  public selectedJobs?: any = [];
  public pagingFilterData?: any;
  public filterData: any = {
    limit: 10,
    offset: 0
  };
  public job?: any;
  public loading?: boolean = false; 

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      jobs: observable,
      savedJobs: observable,
      selectedJobs: observable,
      filterData: observable,
      job: observable,
      loading: observable,
      pagingFilterData: observable,
    });
  }
}