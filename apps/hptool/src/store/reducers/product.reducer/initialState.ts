export type ProductState = {
  name: string;
  quantity: number;
  sold: number;
  remain: number;
  rating: number;
  price: number;
  categories: Array<string>;
  images: Array<any>;
  imagesDataList: Array<any>;
  description: string;
  branch: string;
  sku: string;
  model: string;
  engine: string;
  original: string;
  warranty_time: string;
  thumb: string;
  short_description: string;
  gifts: Array<any>;
  thumbObj: any;
  giftsDataList: Array<any>;
  videos: Array<any>;
  validateObj: any;
  products: Array<any>;
  loading: boolean;
  paging: any;
  filter: any;
  technique: string;
  _id: string;
  selectedIds: Array<string>;
};

const state = {
  name: "",
  quantity: 0,
  sold: 0,
  remain: 0,
  rating: 0,
  price: 0,
  categories: [],
  images: [],
  description: "",
  branch: "",
  sku: "",
  model: "",
  engine: "",
  original: "",
  warranty_time: "",
  thumb: "",
  short_description: "",
  gifts: [],
  videos: [],
  products: [],
  imagesDataList: [],
  thumbObj: {},
  giftsDataList: [],
  technique: "",
  _id: null,
  loading: false,
  paging: {
    total: 0,
    rowsPerPage: 20,
    page: 0,
  },
  filter: {},
  validateObj: {
    name: {
      message: "",
    },
    parent: {
      message: "",
    },
    errors: ["name"],
  },
  selectedIds: [],
};

export default state;
