import { createStore } from "@core-ui/react-mobx-state"
import { AccountStore } from "./AccountStore";
import { UserStore } from "./UserStore"
import { NovelStore } from "./NovelStore"
import { ChapterStore } from "./ChapterStore"
import { CommentStore } from "./CommentStore"
import { RoleStore } from "./RoleStore"
import { AuthorStore } from "./AuthorStore"
import { CategoryStore } from "./CategoryStore"
import { NotifyStore } from "./NotifyStore"
import NovelsSDK, { CreateApiConfig } from "@core-sdk/novels";
import { ReactNode, useEffect } from "react";

export class NovelsStore {
  public accountStore: AccountStore;
  public userStore: UserStore;
  public novelStore: NovelStore;
  public chapterStore: ChapterStore;
  public commentStore: CommentStore;
  public roleStore: RoleStore;
  public authorStore: AuthorStore;
  public categoryStore: CategoryStore;
  public notiStore: NotifyStore;

  public constructor() {
    this.accountStore = new AccountStore();
    this.userStore = new UserStore();
    this.novelStore = new NovelStore();
    this.chapterStore = new ChapterStore();
    this.commentStore = new CommentStore();
    this.roleStore = new RoleStore();
    this.authorStore = new AuthorStore();
    this.categoryStore = new CategoryStore();
    this.notiStore = new NotifyStore();
  }
}

export const novelsStore = createStore<NovelsStore>(new NovelsStore());

export const useNovelsStore = novelsStore.useStore as () => NovelsStore;

const Provider = novelsStore.Provider;

export const NovelsProvider = ({ children, config }: {
  children: ReactNode;
  config: {
    apiConfig: CreateApiConfig;
  }
}) => {
  
  useEffect(() => {
    NovelsSDK.getInstance(config.apiConfig)
  }, [])

  return <Provider>
    {children}
  </Provider>
}

export * from "./AccountStore"
export * from "./UserStore"
export * from "./NovelStore"
export * from "./ChapterStore"
export * from "./CommentStore"
export * from "./RoleStore"
export * from "./AuthorStore"
export * from "./CategoryStore"
export * from "./NotifyStore"