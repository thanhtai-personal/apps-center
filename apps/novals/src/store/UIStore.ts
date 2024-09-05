import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

class UIStore extends BaseStore {
  @observable public pageLoading = false;
  @observable public useHeader = true;
  @observable public useFooter = true;
  @observable public useMenuBar = true;
  @observable public useBottomMenu = false;
  @observable public clipboardText = "";
  @observable public loadingStatus: string = "";
  @observable public colors: { [key: string]: string } = {};

  constructor() {
    super();
    makeObservable(this);
  }

}

export default UIStore;
