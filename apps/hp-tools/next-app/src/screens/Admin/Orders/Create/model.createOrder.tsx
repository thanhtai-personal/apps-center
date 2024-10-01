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

export const orderSchema = object().shape({
  name: string().min(8, "name").required("name"),
  parent: string(),
});

const OrderModel = {
  name: {
    name: "name",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Order name",
    id: "order-name",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.orders.validateObj,
    }),
    onChange: updateOrderName,
    render: (item) => <InputField item={item} />,
  },
  parentOrder: {
    name: "parentOrder",
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "parent",
    id: "order-parentOrder",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.orders.validateObj,
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
    label: "Create",
    action: createOrder,
    selector: (state: any) => ({
      loading: state.orders.loading,
      validateObj: state.orders.validateObj,
    }),
    validated: (validateObj: any) => {
      return !validateObj?.errors || isEmpty(validateObj?.errors);
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

export default OrderModel;
