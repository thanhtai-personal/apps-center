export type OrderState = {
  name: string;
  loading: boolean;
  orders: Array<any>;
  validateObj: any;
};

const state = {
  name: "",
  orders: [],
  loading: false,
  validateObj: {
    name: {
      message: "",
    },
    parent: {
      message: "",
    },
    errors: ["name"],
  },
};

export default state;
