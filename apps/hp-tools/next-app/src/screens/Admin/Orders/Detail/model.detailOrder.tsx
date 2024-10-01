import { FormItemTypes } from "src/components/common/Form";
import InputField from "src/components/common/InputField";
import SelectField from "src/components/common/SelectField";
import ButtonField from "src/components/common/ButtonField";
import {
  createOrder,
  updateOrderName,
  updateOrderParent,
} from "src/actions/order.actions";
import { searchCategories } from "src/actions/category.actions";
import { FieldAlignment } from "src/components/common/Form";
import { object, string } from "yup";
import { isEmpty } from "lodash";
import Flex from "src/components/common/Flex";

export const categorySchema = object().shape({
  name: string().min(8, "name").required("name"),
  parent: string(),
});

const OrderModel = {
  name: {
    name: "name",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Order name",
    id: "category-name",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.categories.validateObj,
    }),
    onChange: updateOrderName,
    render: (item) => <InputField item={item} />,
  },
  parentOrder: {
    name: "parentOrder",
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "parent",
    id: "category-parentOrder",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.categories.validateObj,
    }),
    useNoneValue: true,
    getOptions: () =>
      searchCategories({
        page: 0,
        rowsPerPage: 1000,
      }),
    onChange: updateOrderParent,
    render: (item) => <SelectField item={item} />,
  },
  actionsFooter: {
    type: FormItemTypes.ACTION,
    alignment: FieldAlignment.BOTTOM,
    label: "Edit",
    deleteLabel: "Delete",
    deleteAction: () => {},
    action: createOrder,
    selector: (state: any) => ({
      loading: state.categories.loading,
      validateObj: state.categories.validateObj,
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

export default OrderModel;
