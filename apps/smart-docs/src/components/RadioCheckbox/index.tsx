import { useEffect, useRef } from "react";

const RadioCheckbox = (props: any) => {
  const { name, onChange, label, defaultValue } = props;
  const inputRef:any = useRef();

  const handleChange = (e: any) => {
    onChange && onChange(e.target.checked);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.checked = !!defaultValue
    }
  }, [defaultValue])

  return (
    <div className="checkbox-wrapper">
      <div className="label">{label}</div>
      <input ref={inputRef} name={name} onChange={handleChange} type="checkbox" />
    </div>
  );
};

export default RadioCheckbox;
