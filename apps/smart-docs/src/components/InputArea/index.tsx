import { useEffect, useRef } from "react";

const InputArea = (props: any) => {
  const { name, onChange, value, placeholder, rows = 10 } = props;
  const inputRef: any = useRef();

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value || ""
    }
  }, [value])

  return (
    <textarea
      ref={inputRef}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      style={{ padding: "8px" }}
      rows={rows}
    />
  );
};

export default InputArea;
