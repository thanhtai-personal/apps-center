import { IChapterFilter, IChapterResponse, IPagination, IPagingFilter } from "@core-ui/novels-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IChapterStore {
  error?: any;
  chapters?: IPagination<IChapterResponse>;
  chapter?: IChapterResponse;
  filterData?: IChapterFilter & IPagingFilter;
}

export class ChapterStore extends BaseStore implements IChapterStore {
  public error?: any = null;
  public chapters?: IPagination<IChapterResponse>;
  public chapter?: IChapterResponse;
  public filterData?: IChapterFilter & IPagingFilter;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      chapters: observable,
      chapter: observable,
      filterData: observable,
    });
  }
}