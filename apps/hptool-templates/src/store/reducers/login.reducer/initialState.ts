export type LoginState = {
  username: string;
  password: string;
  loading: boolean;
  validateObj: any;
};

const state = {
  username: "",
  password: "",
  loading: false,
  validateObj: {
    username: {
      message: "",
    },
    password: {
      message: "",
    },
    errors: [],
  },
};

export default state;
