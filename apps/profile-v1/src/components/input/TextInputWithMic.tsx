import { TextInput, TextInputProps } from "flowbite-react";
import { memo, useRef } from "react";
import { DictaphoneButton } from "..";

export interface ITextInputWithMic extends Omit<TextInputProps, 'onChange'> {
  onChange?: (value: string) => void;
}

export const TextInputWithMic = memo(({ className, onChange, ...props }: ITextInputWithMic) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-row">
      <TextInput ref={inputRef} onChange={(e) => {
        onChange && onChange(e.target.value);
      }} className={`border-none w-full ${className}`} {...props} />
      <DictaphoneButton setTranscript={(transcript: string) => {
        if (onChange) {
          onChange(transcript);
        }
        if (inputRef.current) {
          inputRef.current.value = transcript;
        }
      }} />
    </div>
  );
});
