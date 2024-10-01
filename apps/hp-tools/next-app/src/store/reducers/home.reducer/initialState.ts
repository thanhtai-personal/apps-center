export type HomeState = {
  name: string;
  slider_images: Array<string>;
  sliderImagesDataList: Array<any>;
  branchs: Array<string>;
  branchsDataList: Array<any>;
  categories: Array<string>;
  categoriesDataList: Array<any>;
  showing_categories: Array<string>;
  showing_categoriesDataList: Array<any>;
  app_logo: string;
  hot_line: string;
  email: string;
  welcome_text: string;
  loading: boolean;
};

const state = {
  name: "HOME",
  slider_images: [],
  sliderImagesDataList: [
    {
      _id: "test-1",
      url: "https://traffic-edge06.cdn.vncdn.io/cdn-pos/1d5ace-32990/bn/20230224_oxNeLE0urTo96LKO.jpeg",
    },
    {
      _id: "test-2",
      url: "https://traffic-edge13.cdn.vncdn.io/cdn-pos/1d5ace-32990/bn/20230302_3uxtJK2jORVndVUU.jpeg",
    },
    {
      _id: "test-3",
      url: "https://img.cdn.vncdn.io/cdn-pos/1d5ace-32990/bn/20230302_FGmvQlpaWPUtzUE5.jpeg",
    },
    {
      _id: "test-4",
      url: "https://img.cdn.vncdn.io/cdn-pos/1d5ace-32990/bn/20221224_nXjOZQVf5Lf5RUHN.jpg",
    },
    {
      _id: "test-5",
      url: "https://img.cdn.vncdn.io/cdn-pos/1d5ace-32990/bn/20230209_IrKCcfFxEIrxEkUG.jpeg",
    },
  ],
  branchs: [],
  branchsDataList: [],
  categories: [],
  categoriesDataList: [],
  showing_categories: [],
  showing_categoriesDataList: [],
  app_logo: "",
  appLogoObj: {
    url: "",
  },
  address: "",
  hot_line: "",
  email: "",
  welcome_text: "",
  loading: false,
};

export default state;
