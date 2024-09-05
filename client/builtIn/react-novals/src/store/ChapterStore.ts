import { IChapterResponse, IPagination } from "@core-ui/novals-types";
import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

export interface IChapterStore {
  error?: any;
  chapters?: IPagination<IChapterResponse>;
  chapter?: IChapterResponse;
}

export class ChapterStore extends BaseStore implements IChapterStore {
  public error?: any = null;
  public chapters?: IPagination<IChapterResponse>;
  public chapter?: IChapterResponse;

  constructor() {
    super();
    makeObservable(this, {
      error: observable,
      chapters: observable,
      chapter: observable,
    });
  }
}