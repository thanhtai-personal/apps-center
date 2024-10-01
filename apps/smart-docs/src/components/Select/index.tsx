import { useEffect, useRef } from "react";

const Select = (props: any) => {
  const { onChange, defaultValue, getOptions, label, name } = props;
  const inputRef: any = useRef();

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = defaultValue || ""
    }
  }, [defaultValue])

  return (
    <div className="select-wrapper">
      <div className="label">{label}</div>
      <select
        name={name}
        className="node-selection"
        placeholder="Select parent node"
        onChange={handleChange}
        ref={inputRef}
      >
        <option value={""}>None</option>
        {getOptions &&
          getOptions().map((opt: any) => (
            <option key={opt.key} value={opt.value}>
              {opt.label}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
