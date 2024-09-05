import { IAuthorResponse, IPagination } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IAuthorStore {
  error?: any;
  authors?: IPagination<IAuthorResponse>;
  author?: IAuthorResponse;
}

export class AuthorStore extends BaseStore implements IAuthorStore {
  public error?: any = null;
  public authors?: IPagination<IAuthorResponse>;
  public author?: IAuthorResponse;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      authors: observable,
      author: observable,
    });
  }
}