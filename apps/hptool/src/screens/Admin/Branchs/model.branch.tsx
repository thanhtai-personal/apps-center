import { FormItemTypes } from "src/components/common/Form";
import InputField from "src/components/common/InputField";
import ButtonField from "src/components/common/ButtonField";
import { createBranch, updateBranchData } from "src/actions/branch.actions";
import { FieldAlignment } from "src/components/common/Form";
import { object, string } from "yup";
import { isEmpty } from "lodash";
import ImagesSelector from "src/components/ImagesSelector";
import { searchImages } from "src/actions/image.actions";

export const branchSchema = object().shape({
  name: string().min(3, "name").required("name"),
  description: string(),
});

const BranchModel = {
  name: {
    name: "name",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Branch name",
    id: "branch-name",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.branchs.validateObj,
      defaultValue: state.branchs.name,
    }),
    onChange: (data) => updateBranchData(data),
    render: (item) => <InputField item={item} />,
  },
  description: {
    name: "description",
    priority: 3,
    type: FormItemTypes.FIELD,
    label: "description",
    id: "branch-description",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.branchs.validateObj,
      defaultValue: state.branchs.description,
    }),
    onChange: (data) => updateBranchData(data),
    render: (item) => <InputField multiline item={item} />,
  },

  logo: {
    name: "logo",
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "Logo",
    id: "branch-logo",
    inputProps: {
      fullWidth: true,
    },
    updateFilter: () => {},
    selector: (state: any) => ({
      validateObj: state.branchs.validateObj,
      selectedImages: state.branchs?.logoObj ? [state.branchs?.logoObj] : [],
      loading: state.branchs.loading,
    }),
    searchImagesAction: searchImages,
    selectImage: (images) => {
      updateBranchData({
        name: "logo",
        value: images[0]._id,
      });
      updateBranchData({
        name: "logoObj",
        value: images[0],
      });
    },
    render: (item) => (
      <ImagesSelector height={350} width={500} viewMode={false} item={item} />
    ),
  },
  actionsFooter: {
    type: FormItemTypes.ACTION,
    alignment: FieldAlignment.BOTTOM,
    label: "Create",
    action: () => createBranch(),
    selector: (state: any) => ({
      loading: state.branchs.loading,
      validateObj: state.branchs.validateObj,
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

export default BranchModel;
