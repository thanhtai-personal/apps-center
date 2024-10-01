export type UserState = {
  name: string;
  parentUser: string;
  loading: boolean;
  users: Array<any>;
  validateObj: any;
};

const state = {
  name: "",
  parentUser: "",
  users: [],
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
