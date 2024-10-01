import { FormItemTypes } from "src/components/common/Form";
import InputField from "src/components/common/InputField";
import SelectField from "src/components/common/SelectField";
import ButtonField from "src/components/common/ButtonField";
import {
  createOrUpdateCategory,
  updateCategoryData,
  AdminSearchCategories,
} from "src/actions/category.actions";
import { FieldAlignment } from "src/components/common/Form";
import { object, string } from "yup";
import { isEmpty } from "lodash";

export const categorySchema = object().shape({
  name: string().min(3, "name").required("name"),
  parent: string(),
});

const CategoryModel = {
  name: {
    name: "name",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Category name",
    id: "category-name",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.categories.validateObj,
      defaultValue: state.categories.detail?.name,
    }),
    onChange: (data) => updateCategoryData(data),
    render: (item) => <InputField item={item} />,
  },
  level: {
    name: "level",
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "Category level",
    id: "category-level",
    inputProps: {
      fullWidth: true,
    },
    options: [
      {
        key: 1,
        name: "1",
        value: 1,
      },
      {
        key: 2,
        name: "2",
        value: 2,
      },
      {
        key: 3,
        name: "3",
        value: 3,
      },
    ],
    selector: (state: any) => ({
      validateObj: state.categories.validateObj,
      defaultValue: state.categories.detail?.level,
    }),
    onChange: (data) => updateCategoryData(data),
    render: (item) => <SelectField item={item} />,
  },
  parent: {
    name: "parent",
    priority: 3,
    type: FormItemTypes.FIELD,
    label: "Parent",
    id: "homepage-parent",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.categories.validateObj,
      defaultValue: state.categories.detail?.parent,
    }),
    getOptions: () =>
      AdminSearchCategories({
        page: 0,
        rowsPerPage: 1000,
      }),
    onChange: (data) => updateCategoryData(data),
    render: (item) => <SelectField item={item} />,
  },
  actionsFooter: {
    type: FormItemTypes.ACTION,
    alignment: FieldAlignment.BOTTOM,
    label: "Create",
    action: () => createOrUpdateCategory(),
    selector: (state: any) => ({
      loading: state.categories.loading,
      validateObj: state.categories.validateObj,
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

export default CategoryModel;
