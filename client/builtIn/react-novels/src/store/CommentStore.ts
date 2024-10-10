import { ICommentFilter, ICommentResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface ICommentStore {
  error?: any;
  comments?: IPagination<ICommentResponse>;
  comment?: ICommentResponse;
  filterData?: ICommentFilter & IPagingFilter;
}

export class CommentStore extends BaseStore implements ICommentStore {
  public error?: any = null;
  public comments?: IPagination<ICommentResponse>;
  public comment?: ICommentResponse;
  public filterData?: ICommentFilter & IPagingFilter;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      comments: observable,
      comment: observable,
      filterData: observable,
    });
  }
}