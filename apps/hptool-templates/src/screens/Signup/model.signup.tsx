import { FormItemTypes } from "components/common/Form";
import InputField from "components/common/InputField";
import ButtonField from "components/common/ButtonField";
import {
  signup,
  updatePassword,
  updateUsername,
  updatePasswordConfirm,
  updateFullName,
  updatePhoneNumber,
  updateEmail,
} from "actions/signup.actions";
import { FieldAlignment } from "components/common/Form";
import { object, string, mixed, ref } from "yup";
import { isEmpty } from "lodash";

export const signupSchema = object().shape({
  username: string().min(8, "username").required("username"),
  password: string().min(8, "password").required("password"),
  confirmPassword: mixed()
    .oneOf([ref("password"), null], "confirmPassword")
    .required("confirmPassword"),
  fullname: string().required("fullname"),
  phone: string()
    .matches(/^(\+\d{1,3})?\s?(\d{3})\s?\d{3}\s?\d{4}$/, "phone")
    .required("phone"),
  email: string().email("email").required("email"),
});

const SignupModel = {
  username: {
    name: "username",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Username",
    id: "signup-user-name",
    alignment: FieldAlignment.TOP_LEFT,
    inputProps: {
      fullWidth: true,
    },
    onChange: updateUsername,
    helpText: "We'll never share your account",
    render: (item) => <InputField item={item} />,
  },
  password: {
    name: "password",
    priority: 2,
    type: FormItemTypes.FIELD,
    alignment: FieldAlignment.TOP_LEFT,
    label: "Password",
    id: "signup-password",
    helpText: "We'll secure your password",
    inputProps: {
      type: "password",
      fullWidth: true,
    },
    onChange: updatePassword,
    render: (item) => <InputField item={item} />,
  },
  confirmPassword: {
    name: "confirmPassword",
    priority: 3,
    type: FormItemTypes.FIELD,
    alignment: FieldAlignment.TOP_LEFT,
    label: "Confirm your password",
    id: "signup-password-confirm",
    inputProps: {
      type: "password",
      fullWidth: true,
    },
    onChange: updatePasswordConfirm,
    render: (item) => <InputField item={item} />,
  },
  fullName: {
    name: "fullName",
    priority: 1,
    type: FormItemTypes.FIELD,
    alignment: FieldAlignment.TOP_RIGHT,
    label: "Full name",
    id: "signup-user-name",
    inputProps: {
      fullWidth: true,
    },
    onChange: updateFullName,
    render: (item) => <InputField item={item} />,
  },
  phone: {
    name: "phone",
    priority: 2,
    type: FormItemTypes.FIELD,
    alignment: FieldAlignment.TOP_RIGHT,
    label: "Phone number",
    id: "signup-phone-number",
    inputProps: {
      fullWidth: true,
    },
    onChange: updatePhoneNumber,
    render: (item) => <InputField item={item} />,
  },
  email: {
    name: "email",
    priority: 3,
    type: FormItemTypes.FIELD,
    alignment: FieldAlignment.TOP_RIGHT,
    label: "Email",
    id: "signup-email",
    inputProps: {
      fullWidth: true,
    },
    onChange: updateEmail,
    render: (item) => <InputField item={item} />,
  },
  actionsFooter: {
    type: FormItemTypes.ACTION,
    alignment: FieldAlignment.BOTTOM,
    label: "SIGN UP",
    action: signup,
    selector: (state: any) => ({
      loading: state.signup.loading,
    }),
    validated: (validateObj) =>
      !validateObj.errors || isEmpty(validateObj.errors),
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

export default SignupModel;
