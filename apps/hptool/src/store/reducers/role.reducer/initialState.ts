export type RoleState = {
  name: string;
  loading: boolean;
  validateObj: any;
};

const state = {
  name: "",
  loading: false,
  validateObj: {
    name: {
      message: "",
    },
    errors: ["name"],
  },
};

export default state;
