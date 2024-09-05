import { createStore } from "@core-ui/react-mobx-state"
import { AccountStore } from "./AccountStore";

export class GoatTapStore {
  public accountStore: AccountStore;

  public constructor() {
    this.accountStore = new AccountStore();
  }
}

export const goatTapStore = createStore<GoatTapStore>(new GoatTapStore());

export const useGoatTapStore = goatTapStore.useStore as () => GoatTapStore;

export * from "./AccountStore"
export * from "./Provider"