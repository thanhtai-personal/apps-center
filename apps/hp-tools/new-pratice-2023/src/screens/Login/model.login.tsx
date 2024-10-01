import { FormItemTypes } from "components/common/Form";
import InputField from "components/common/InputField";
import ButtonField from "components/common/ButtonField";
import { login, updatePassword, updateUsername } from "actions/login.actions";
import { FieldAlignment } from "components/common/Form";
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
    action: login,
    selector: (state: any) => ({
      loading: state.login.loading,
      validateObj: state.login.validateObj,
    }),
    validated: (validateObj) => {
      return !validateObj.errors || isEmpty(validateObj.errors);
    },
    render: ({ label, action, selector, validated }) => (
      <ButtonField
        action={action}
        label={label}
        selector={selector}
        validated={validated}
      />
    ),
  },
};

export default LoginModel;
