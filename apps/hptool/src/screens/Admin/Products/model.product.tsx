import { FormItemTypes } from "src/components/common/Form";
import InputField from "src/components/common/InputField";
import SelectField from "src/components/common/SelectField";
import ButtonField from "src/components/common/ButtonField";
import ImagesSelector from "src/components/ImagesSelector";
// import ProductSelector from "src/components/ProductSelector";
import VideoInput from "src/components/common/VideoInput";
import RichTextField from "src/components/common/RichTextField";
import { createProduct, updateProductData } from "src/actions/product.actions";
import { searchCategories } from "src/actions/category.actions";
import { searchBranchs } from "src/actions/branch.actions";
import { searchImages, updateFilterImages } from "src/actions/image.actions";
import { FieldAlignment } from "src/components/common/Form";
import { array, number, object, string } from "yup";
import { isEmpty } from "lodash";
import MultipleSelectField from "src/components/common/MultipleSelectField";

export const productSchema = object().shape({
  name: string().min(8, "name").required("name"),
  branch: string(),
  sku: string(),
  model: string(),
  engine: string(),
  original: string(),
  warranty_time: string(),
  quantity: number().min(1),
  sold: number().min(0),
  remain: number().min(0),
  rating: number().min(0),
  price: number().min(0),
  categories: array(),
  images: array(),
  thumb: string(),
  short_description: string(),
  gifts: array(),
  description: string(),
  videos: array(),
});

const ProductModel = {
  name: {
    name: "name",
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Product name",
    id: "product-name",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.name,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  branch: {
    name: "branch",
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "Branch",
    id: "product-branch",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.branch,
    }),
    getOptions: () => searchBranchs({}),
    onChange: (data) => updateProductData(data),
    render: (item) => <SelectField item={item} />,
  },
  sku: {
    name: "sku",
    priority: 3,
    type: FormItemTypes.FIELD,
    label: "SKU",
    id: "product-sku",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.sku,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  model: {
    name: "model",
    priority: 4,
    type: FormItemTypes.FIELD,
    label: "Model",
    id: "product-model",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.model,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  engine: {
    name: "engine",
    priority: 5,
    type: FormItemTypes.FIELD,
    label: "Engine",
    id: "product-engine",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.engine,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  original: {
    name: "original",
    priority: 6,
    type: FormItemTypes.FIELD,
    label: "Original",
    id: "product-original",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.original,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  warranty_time: {
    name: "warranty_time",
    priority: 7,
    type: FormItemTypes.FIELD,
    label: "Warranty",
    id: "product-warranty_time",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.warranty_time,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  categories: {
    name: "categories",
    priority: 8,
    type: FormItemTypes.FIELD,
    label: "Categories",
    id: "product-categories",
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.categories,
    }),
    getOptions: () =>
      searchCategories({
        page: 0,
        rowsPerPage: 1000,
      }),
    onChange: (data = []) =>
      updateProductData({
        name: "",
        value: data.map((opt) => opt.id),
      }),
    render: (item) => <MultipleSelectField item={item} />,
  },
  quantity: {
    name: "quantity",
    priority: 9,
    type: FormItemTypes.FIELD_GROUP,
    label: "Quantity",
    id: "product-quantity",
    inputProps: {
      fullWidth: true,
      type: "number",
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.quantity,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  sold: {
    name: "sold",
    priority: 10,
    type: FormItemTypes.FIELD_GROUP,
    label: "Sold",
    id: "product-sold",
    inputProps: {
      fullWidth: true,
      type: "number",
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.sold,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  remain: {
    name: "remain",
    priority: 11,
    type: FormItemTypes.FIELD_GROUP,
    label: "Remain",
    id: "product-remain",
    inputProps: {
      fullWidth: true,
      type: "number",
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.remain,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  price: {
    name: "price",
    priority: 12,
    type: FormItemTypes.FIELD,
    label: "Price",
    id: "product-price",
    inputProps: {
      fullWidth: true,
      type: "number",
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.price,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField money item={item} />,
  },
  rating: {
    name: "rating",
    priority: 13,
    type: FormItemTypes.FIELD,
    label: "Rating",
    id: "product-rating",
    inputProps: {
      fullWidth: true,
      type: "number",
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.rating,
    }),
    onChange: (data) => updateProductData(data),
    options: [
      {
        key: "1",
        value: 1,
        name: "1 Star",
      },
      {
        key: "2",
        value: 2,
        name: "2 Stars",
      },
      {
        key: "3",
        value: 3,
        name: "3 Stars",
      },
      {
        key: "4",
        value: 4,
        name: "4 Stars",
      },
      {
        key: "5",
        value: 5,
        name: "5 Stars",
      },
    ],
    render: (item) => <SelectField item={item} />,
  },
  thumb: {
    name: "thumb",
    alignment: FieldAlignment.TOP_RIGHT,
    priority: 1,
    type: FormItemTypes.FIELD,
    label: "Thumb",
    id: "product-thumb",
    inputProps: {
      fullWidth: true,
    },
    updateFilter: updateFilterImages,
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      selectedImages: state.products.thumbObj ? [state.products.thumbObj] : [],
    }),
    searchImagesAction: searchImages,
    selectImage: (images) =>
      updateProductData({
        name: "thumbObj",
        value: images[0],
      }),
    render: (item) => (
      <ImagesSelector height={350} viewMode={false} item={item} />
    ),
  },
  images: {
    name: "images",
    alignment: FieldAlignment.TOP_RIGHT,
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "Images",
    id: "product-images",
    multipleSelect: true,
    inputProps: {
      fullWidth: true,
    },
    updateFilter: updateFilterImages,
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      selectedImages: state.products.imagesDataList,
    }),
    searchImagesAction: searchImages,
    selectImage: (images) =>
      updateProductData({
        name: "imagesDataList",
        value: images,
      }),
    onChange: (data) => updateProductData(data),
    render: (item) => (
      <ImagesSelector height={350} viewMode={false} item={item} />
    ),
  },
  videos: {
    name: "videos",
    alignment: FieldAlignment.TOP_RIGHT,
    priority: 3,
    type: FormItemTypes.FIELD,
    label: "Video",
    id: "product-videos",
    updateVideos: (videos) =>
      updateProductData({ name: "videos", value: videos }),
    inputProps: {
      fullWidth: true,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      videos: state.products.videos,
    }),
    render: (item) => <VideoInput item={item} />,
  },
  short_description: {
    name: "short_description",
    priority: 14,
    type: FormItemTypes.FIELD,
    label: "Short description",
    id: "product-short_description",
    inputProps: {
      fullWidth: true,
      multiline: true,
      minRows: 15,
      maxRows: 15,
    },
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.short_description,
    }),
    onChange: (data) => updateProductData(data),
    render: (item) => <InputField item={item} />,
  },
  technique: {
    name: "technique",
    alignment: FieldAlignment.BOTTOM_LEFT,
    priority: 2,
    type: FormItemTypes.FIELD,
    label: "Technique",
    id: "product-technique",
    inputProps: {
      fullWidth: true,
      multiline: true,
    },
    setGlobalEditor: (editor) => (window.techniqueEditor = editor),
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.technique,
    }),
    onChange: (v) => {
      updateProductData({
        name: "technique",
        value: v,
      });
    },
    render: (item) => <RichTextField item={item} />,
  },
  description: {
    name: "description",
    alignment: FieldAlignment.BOTTOM_LEFT,
    priority: 3,
    type: FormItemTypes.FIELD,
    label: "Description",
    id: "product-description",
    inputProps: {
      fullWidth: true,
      multiline: true,
    },
    setGlobalEditor: (editor) => (window.descriptionEditor = editor),
    selector: (state: any) => ({
      validateObj: state.products.validateObj,
      defaultValue: state.products.description,
    }),
    onChange: (v) => {
      updateProductData({
        name: "description",
        value: v,
      });
    },
    render: (item) => <RichTextField item={item} />,
  },
  actionsFooter: {
    type: FormItemTypes.ACTION,
    alignment: FieldAlignment.BOTTOM,
    label: "Submit",
    action: () => createProduct(),
    selector: (state: any) => ({
      loading: state.products.loading,
      validateObj: state.products.validateObj,
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

export default ProductModel;
