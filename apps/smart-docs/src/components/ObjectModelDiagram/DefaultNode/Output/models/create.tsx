import Input from "app/components/Input";
import InputNumber from "app/components/InputNumber";
import RadioCheckbox from "app/components/RadioCheckbox";
import Select from "app/components/Select";
import TabSelector from "app/components/TabSelecter";
import { positionOptions } from "app/utils/constants";

const DefaultModel = {
  id: {
    priority: 1,
    render: ({ onChange, value }: any) => {
      return (
        <Input
          name="id"
          placeholder="Enter unique id"
          onChange={onChange}
          value={value}
        />
      );
    },
  },
  label: {
    priority: 2,
    render: ({ onChange, value }: any) => {
      return (
        <Input
          name="label"
          onChange={onChange}
          placeholder="Enter label"
          value={value}
        />
      );
    },
  },
  zIndex: {
    priority: 3,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <InputNumber
          name="zIndex: "
          onChange={onChange}
          placeholder="Enter zIndex"
          value={value}
        />
      );
    },
  },
  style: {
    priority: 4,
    render: ({ onChange, value }: any) => {
      return (
        <Input
          name="Style"
          onChange={onChange}
          placeholder="Enter style"
          value={value}
        />
      );
    },
  },
  className: {
    priority: 5,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <Select
          name={"className"}
          label={"Classname:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  selectable: {
    priority: 6,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <RadioCheckbox
          name={"selectable"}
          label={"Selectable:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  parentNode: {
    priority: 7,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <Select
          name={"parentNode"}
          label={"Parent node:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  targetPosition: {
    priority: 8,
    render: ({ onChange, value }: any) => {
      return (
        <TabSelector
          name={"targetPosition"}
          onChange={onChange}
          options={positionOptions}
          defaultValue={value}
          label={"Target position:"}
        />
      );
    },
  },
  sourcePosition: {
    priority: 9,
    render: ({ onChange, value }: any) => {
      return (
        <TabSelector
          name={"sourcePosition"}
          onChange={onChange}
          options={positionOptions}
          defaultValue={value}
          label={"Source position:"}
        />
      );
    },
  },
};

export default DefaultModel;
