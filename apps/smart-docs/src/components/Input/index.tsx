import { useEffect, useRef } from "react";

const Input = (props: any) => {
  const { name, onChange, value, placeholder } = props;
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
    <input ref={inputRef} name={name} onChange={handleChange} placeholder={placeholder} />
  );
};

export default Input;
