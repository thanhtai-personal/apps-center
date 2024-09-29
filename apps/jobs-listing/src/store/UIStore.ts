import { BaseStore, makeObservable, observable } from "@core-ui/react-mobx-state";

class UIStore extends BaseStore {
  @observable public pageLoading = false;
  @observable public rotate = false;
  @observable public triggerClickAnimation = 0;
  @observable public useHeader = true;
  @observable public useFooter = true;
  @observable public useMenuBar = true;
  @observable public useBottomMenu = false;
  @observable public clipboardText = "";
  @observable public loadingStatus: string = "";
  @observable public openLoginSection: boolean = false;
  @observable public colors: { [key: string]: string } = {};
  @observable public language = "EN";

  constructor() {
    super();
    makeObservable(this);
  }

}

export default UIStore;
