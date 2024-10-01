export type LayoutState = {
  isGlobalLoading: boolean;
  useHeader: boolean;
  useFooter: boolean;
  disabledOutSiteClick?: boolean;
  menuAlignment: Array<string>;
  menus: Array<any>;
  dividerList: Array<any>;
  activeMenus: Array<string>;
  isPermanent: boolean;
  openMobileCategoryMenu: boolean;
};

const state = {
  isGlobalLoading: false,
  useHeader: false,
  useFooter: false,
  menuAlignment: [],
  menus: [],
  dividerList: [],
  activeMenus: [],
  disabledOutSiteClick: true,
  isPermanent: true,
  openMobileCategoryMenu: false,
};

export default state;
