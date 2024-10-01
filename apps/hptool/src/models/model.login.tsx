import { FormItemTypes } from "src/components/common/Form";
import InputField from "src/components/common/InputField";
import ButtonField from "src/components/common/ButtonField";
import {
  login,
  updatePassword,
  updateUsername,
} from "src/actions/login.actions";
import { FieldAlignment } from "src/components/common/Form";
import { object, string } from "yup";
import { isEmpty } from "lodash";

export const loginSchema = object().shape({
  username: string().min(8, "username").required("username"),
  password: string()
    .min(8, "password")
    .required("password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "password"
    ),
  // Have a minimum length of 8 characters
  // Have at least one lowercase letter
  // Have at least one uppercase letter
  // Have at least one digit
  // Have at least one special character (i.e. one of @$!%*?&)
});

const LoginModel = {
  username: {
    name: "username",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Username",
    id: "login-user-name",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.login.validateObj,
    }),
    onChange: updateUsername,
    helpText: "We'll never share your account",
    render: (item) => <InputField item={item} />,
  },
  password: {
    name: "password",
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "Password",
    id: "login-password",
    helpText: "We'll secure your password",
    inputProps: {
      type: "password",
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.login.validateObj,
    }),
    onChange: updatePassword,
    render: (item) => <InputField item={item} />,
  },
  actionsFooter: {
    type: FormItemTypes.ACTION,
    alignment: FieldAlignment.BOTTOM,
    label: "Login",
    action: async ({ router }) => {
      try {
        await login();
        router && router.push("/welcome");
      } catch (error) {}
    },
    selector: (state: any) => ({
      loading: state.login.loading,
      validateObj: state.login.validateObj,
    }),
    validated: (validateObj) => {
      return !validateObj.errors || isEmpty(validateObj.errors);
    },
    render: ({ label, action, selector, validated, router }) => (
      <ButtonField
        action={action}
        label={label}
        selector={selector}
        validated={validated}
        router={router}
      />
    ),
  },
};

export default LoginModel;
