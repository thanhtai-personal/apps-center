import Input from "app/components/Input";
import InputArea from "app/components/InputArea";
import InputNumber from "app/components/InputNumber";
import RadioCheckbox from "app/components/RadioCheckbox";
import Select from "app/components/Select";

const withMouseEventNodeModel = {
  id: {
    priority: 1,
    render: ({ onChange, value }: any) => {
      return (
        <Input
          name="id"
          onChange={onChange}
          placeholder="Enter unique id"
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
  textStyle: {
    priority: 3,
    render: ({ onChange, value }: any) => {
      return (
        <InputNumber
          name="textStyle"
          value={value}
          onChange={onChange}
          placeholder="Enter text style"
        />
      );
    },
  },
  content: {
    priority: 4,
    render: ({ onChange, value }: any) => {
      return (
        <InputArea
          name="content"
          value={value}
          onChange={onChange}
          placeholder="Enter html content"
        />
      );
    },
  },
  width: {
    priority: 5,
    render: ({ onChange, value }: any) => {
      return (
        <InputNumber
          name="width"
          value={value}
          onChange={onChange}
          placeholder="Enter width"
        />
      );
    },
  },
  height: {
    priority: 6,
    render: ({ onChange, value }: any) => {
      return (
        <InputNumber
          name="height"
          value={value}
          onChange={onChange}
          placeholder="Enter height"
        />
      );
    },
  },
  background: {
    priority: 7,
    render: ({ onChange, value }: any) => {
      return (
        <Input
          name="background"
          value={value}
          onChange={onChange}
          placeholder="Enter background color"
        />
      );
    },
  },
  zIndex: {
    priority: 8,
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
    priority: 9,
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
  selectable: {
    priority: 10,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <RadioCheckbox
          name="selectable"
          label={"Selectable:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  parentNode: {
    priority: 11,
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
};

export default withMouseEventNodeModel;
