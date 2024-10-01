export type SignupState = {
  username: string;
  password: string;
  confirmPassword: string;
  fullname: string;
  phoneNumber: string;
  email: string;
  loading: boolean;
  validateObj: any;
};

const state = {
  username: "",
  password: "",
  confirmPassword: "",
  fullname: "",
  phoneNumber: "",
  email: "",
  loading: false,
  validateObj: {
    username: {
      message: "",
    },
    password: {
      message: "",
    },
    confirmPassword: {
      message: "",
    },
    fullname: {
      message: "",
    },
    phoneNumber: {
      message: "",
    },
    email: {
      message: "",
    },
    errors: [],
  },
};

export default state;
