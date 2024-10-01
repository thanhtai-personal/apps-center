import Input from "app/components/Input";
import RadioCheckbox from "app/components/RadioCheckbox";
import Select from "app/components/Select";

const DefaultEdgeModel = {
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
    priority: 1.1,
    render: ({ onChange, value }: any) => {
      return (
        <Input
          name="Label"
          onChange={onChange}
          placeholder="Enter label"
          value={value}
        />
      );
    },
  },
  style: {
    priority: 1.2,
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
  source: {
    priority: 2,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <Select
          name={"source"}
          label={"Source node:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  target: {
    priority: 3,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <Select
          name={"target"}
          label={"Target node:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  sourceHandle: {
    priority: 4,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <Select
          name={"sourceHandle"}
          label={"Source handle:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  markerStart: {
    priority: 5,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <Select
          name={"markerStart"}
          label={"Marker start:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  markerEnd: {
    priority: 6,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <Select
          name={"markerEnd"}
          label={"Marker end:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
  className: {
    priority: 7,
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
  animated: {
    priority: 8,
    render: ({ onChange, value, getOptions }: any) => {
      return (
        <RadioCheckbox
          name={"animated"}
          label={"Animated:"}
          onChange={onChange}
          defaultValue={value}
          getOptions={getOptions}
        />
      );
    },
  },
};

export default DefaultEdgeModel;
