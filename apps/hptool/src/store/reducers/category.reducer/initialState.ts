export type CategoryState = {
  name: string;
  parent: string;
  level: number;
  loading: boolean;
  categories: Array<any>;
  validateObj: any;
  searchId: string;
  detail: any;
};

const state = {
  name: "",
  level: 1,
  parent: "",
  categories: [],
  loading: false,
  detail: {},
  searchId: "",
  validateObj: {
    name: {
      message: "",
    },
    parent: {
      message: "",
    },
    level: {
      message: "",
    },
    errors: ["name"],
  },
};

export default state;
