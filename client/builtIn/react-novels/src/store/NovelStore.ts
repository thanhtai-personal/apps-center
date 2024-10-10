import { INovelFilter, INovelResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface INovelStore {
  error?: any;
  novels?: IPagination<INovelResponse>;
  novel?: INovelResponse;
  topView?: INovelResponse[];
  topLike?: INovelResponse[];
  topVote?: INovelResponse[];
  topFollow?: INovelResponse[];
  filterData?: INovelFilter & IPagingFilter;
}

export class NovelStore extends BaseStore implements INovelStore {
  public error?: any = null;
  public novels?: IPagination<INovelResponse>;
  public topView?: INovelResponse[] = [];
  public topLike?: INovelResponse[] = [];
  public topVote?: INovelResponse[] = [];
  public topFollow?: INovelResponse[] = [];
  public novel?: INovelResponse;
  public filterData?: INovelFilter & IPagingFilter;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      novels: observable,
      novel: observable,
      filterData: observable,
      topView: observable,
      topLike: observable,
      topVote: observable,
      topFollow: observable,
    });
  }
}