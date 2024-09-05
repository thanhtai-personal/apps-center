import { ICommentResponse, IPagination } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface ICommentStore {
  error?: any;
  comments?: IPagination<ICommentResponse>;
  comment?: ICommentResponse;
}

export class CommentStore extends BaseStore implements ICommentStore {
  public error?: any = null;
  public comments?: IPagination<ICommentResponse>;
  public comment?: ICommentResponse;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      comments: observable,
      comment: observable,
    });
  }
}