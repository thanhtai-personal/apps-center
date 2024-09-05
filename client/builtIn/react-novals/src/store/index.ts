import { createStore } from "@core-ui/react-mobx-state"
import { AccountStore } from "./AccountStore";
import { UserStore } from "./UserStore"
import { NovalStore } from "./NovalStore"
import { ChapterStore } from "./ChapterStore"
import { CommentStore } from "./CommentStore"
import { RoleStore } from "./RoleStore"
import { AuthorStore } from "./AuthorStore"
import { CategoryStore } from "./CategoryStore"

export class NovalsStore {
  public accountStore: AccountStore;
  public userStore: UserStore;
  public novalStore: NovalStore;
  public chapterStore: ChapterStore;
  public commentStore: CommentStore;
  public roleStore: RoleStore;
  public authorStore: AuthorStore;
  public categoryStore: CategoryStore;

  public constructor() {
    this.accountStore = new AccountStore();
    this.userStore = new UserStore();
    this.novalStore = new NovalStore();
    this.chapterStore = new ChapterStore();
    this.commentStore = new CommentStore();
    this.roleStore = new RoleStore();
    this.authorStore = new AuthorStore();
    this.categoryStore = new CategoryStore();
  }
}

export const novalsStore = createStore<NovalsStore>(new NovalsStore());

export const useNovalsStore = novalsStore.useStore as () => NovalsStore;

export * from "./AccountStore"
export * from "./UserStore"
export * from "./NovalStore"
export * from "./ChapterStore"
export * from "./CommentStore"
export * from "./RoleStore"
export * from "./AuthorStore"
export * from "./CategoryStore"