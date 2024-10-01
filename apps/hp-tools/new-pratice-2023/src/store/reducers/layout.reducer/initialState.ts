export type LayoutState = {
  isGlobalLoading: boolean;
  useHeader: boolean;
  useFooter: boolean;
  menuAlignment: Array<string>;
  menus: Array<any>;
  dividerList: Array<any>;
};

const state = {
  isGlobalLoading: false,
  useHeader: true,
  useFooter: true,
  menuAlignment: [],
  menus: [],
  dividerList: [],
};

export default state;
