import { FormItemTypes } from "src/components/common/Form";
import InputField from "src/components/common/InputField";
import ButtonField from "src/components/common/ButtonField";
import ImagesSelector from "src/components/ImagesSelector";
import { searchCategories } from "src/actions/category.actions";
import { searchBranchs } from "src/actions/branch.actions";
import { searchImages, updateFilterImages } from "src/actions/image.actions";
import { FieldAlignment } from "src/components/common/Form";
import { array, object, string } from "yup";
import { isEmpty } from "lodash";
import MultipleSelectField from "src/components/common/MultipleSelectField";
import { updateUIconfigData, createUIconfig } from "src/actions/home.actions";

export const productSchema = object().shape({
  name: string(),
  slider_images: array(),
  branchs: array(),
  categories: array(),
  showing_categories: array(),
  app_logo: string(),
  hot_line: string(),
  address: string(),
  email: string(),
  welcome_text: string(),
});

const HomeConfigModel = {
  slider_images: {
    name: "slider_images",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Banner images",
    id: "homepage-slider_images",
    multipleSelect: true,
    inputProps: {
      fullWidth: true,
    },
    updateFilter: updateFilterImages,
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      selectedImages: state.home.sliderImagesDataList,
    }),
    searchImagesAction: searchImages,
    selectImage: (images) =>
      updateUIconfigData({
        name: "sliderImagesDataList",
        value: images,
      }),
    onChange: (data) => updateUIconfigData(data),
    render: (item) => (
      <ImagesSelector height={350} viewMode={false} item={item} />
    ),
  },
  branchs: {
    name: "branchs",
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "Branchs",
    id: "homepage-branchs",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      defaultValue: state.home.branchsDataList,
    }),
    getOptions: () => searchBranchs({}),
    onChange: (data = []) => {
      updateUIconfigData({
        name: "branchsDataList",
        value: data,
      });
    },
    render: (item) => <MultipleSelectField item={item} />,
  },
  categories: {
    name: "categories",
    priority: 3,
    type: FormItemTypes.FIELD,
    label: "Categories",
    id: "homepage-categories",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      defaultValue: state.home.categoriesDataList,
    }),
    getOptions: () =>
      searchCategories({
        page: 0,
        rowsPerPage: 1000,
      }),
    onChange: (data = []) =>
      updateUIconfigData({
        name: "categoriesDataList",
        value: data,
      }),
    render: (item) => <MultipleSelectField item={item} />,
  },
  showing_categories: {
    name: "showing_categories",
    priority: 4,
    type: FormItemTypes.FIELD,
    label: "Products by categories",
    id: "homepage-categories",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      defaultValue: state.home.showing_categoriesDataList,
    }),
    getOptions: () =>
      searchCategories({
        page: 0,
        rowsPerPage: 1000,
      }),
    onChange: (data = []) =>
      updateUIconfigData({
        name: "showing_categoriesDataList",
        value: data,
      }),
    render: (item) => <MultipleSelectField item={item} />,
  },
  app_logo: {
    name: "app_logo",
    priority: 5,
    type: FormItemTypes.FIELD,
    label: "App Logo",
    id: "home-app_logo",
    inputProps: {
      fullWidth: true,
    },
    updateFilter: updateFilterImages,
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      selectedImages: state.home.appLogoObj ? [state.home.appLogoObj] : [],
    }),
    searchImagesAction: searchImages,
    selectImage: (images) =>
      updateUIconfigData({
        name: "appLogoObj",
        value: images[0],
      }),
    render: (item) => (
      <ImagesSelector height={350} viewMode={false} item={item} />
    ),
  },
  hot_line: {
    name: "hot_line",
    priority: 6,
    type: FormItemTypes.FIELD,
    label: "Hot line",
    id: "home-hot_line",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      defaultValue: state.home.hot_line,
    }),
    onChange: (data) => updateUIconfigData(data),
    render: (item) => <InputField item={item} />,
  },
  address: {
    name: "address",
    priority: 7,
    type: FormItemTypes.FIELD,
    label: "Address",
    id: "home-address",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      defaultValue: state.home.address,
    }),
    onChange: (data) => updateUIconfigData(data),
    render: (item) => <InputField item={item} />,
  },
  email: {
    name: "email",
    priority: 8,
    type: FormItemTypes.FIELD,
    label: "Email",
    id: "home-email",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      defaultValue: state.home.email,
    }),
    onChange: (data) => updateUIconfigData(data),
    render: (item) => <InputField item={item} />,
  },
  welcome_text: {
    name: "welcome_text",
    priority: 9,
    type: FormItemTypes.FIELD,
    label: "Wellcome text",
    id: "product-welcome_text",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.home.validateObj,
      defaultValue: state.home.welcome_text,
    }),
    onChange: (data) => updateUIconfigData(data),
    render: (item) => <InputField item={item} />,
  },
  actionsFooter: {
    type: FormItemTypes.ACTION,
    alignment: FieldAlignment.BOTTOM,
    label: "Save config",
    action: () => createUIconfig(),
    selector: (state: any) => ({
      loading: state.home.loadingSubmit,
      validateObj: state.home.validateObj,
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

export default HomeConfigModel;
