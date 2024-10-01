export type BranchState = {
  name: string;
  description: string;
  loading: boolean;
  logo: string;
  logoObj: any;
  validateObj: any;
  searchId: string;
  branchs: Array<any>;
};

const state = {
  name: "",
  description: "",
  logo: "",
  logoObj: {},
  loading: false,
  searchId: "",
  branchs: [],
  validateObj: {
    name: {
      message: "",
    },
    description: {
      message: "",
    },
    errors: ["name"],
  },
};

export default state;
