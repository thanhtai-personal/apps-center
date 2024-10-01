import { FormItemTypes } from "src/components/common/Form";
import InputField from "src/components/common/InputField";
import SelectField from "src/components/common/SelectField";
import ButtonField from "src/components/common/ButtonField";
import {
  createUser,
  updateUserName,
  updateUserParent,
  getAllUsers,
} from "src/actions/user.actions";
import { FieldAlignment } from "src/components/common/Form";
import { object, string } from "yup";
import Flex from "src/components/common/Flex";

export const userSchema = object().shape({
  name: string().min(8, "name").required("name"),
  parent: string(),
});

const UserModel = {
  name: {
    name: "name",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "User name",
    id: "user-name",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.users.validateObj,
    }),
    onChange: updateUserName,
    render: (item) => <InputField item={item} />,
  },
  parentUser: {
    name: "parentUser",
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "parent",
    id: "user-parentUser",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.users.validateObj,
    }),
    useNoneValue: true,
    getOptions: getAllUsers,
    onChange: updateUserParent,
    render: (item) => <SelectField item={item} />,
  },
  actionsFooter: {
    type: FormItemTypes.ACTION,
    alignment: FieldAlignment.BOTTOM,
    label: "Edit",
    deleteLabel: "Delete",
    deleteAction: () => {},
    action: createUser,
    selector: (state: any) => ({
      loading: state.users.loading,
      validateObj: state.users.validateObj,
    }),
    validated: (validateObj: any) => {
      return true;
    },
    render: ({
      label,
      action,
      selector,
      validated,
      deleteAction,
      deleteLabel,
    }) => (
      <Flex>
        <ButtonField
          action={action}
          label={label}
          selector={selector}
          validated={validated}
        />
        <ButtonField
          action={deleteAction}
          label={deleteLabel}
          selector={selector}
          validated={validated}
        />
      </Flex>
    ),
  },
};

export default UserModel;
