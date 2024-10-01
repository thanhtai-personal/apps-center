import { useTranslate } from "@/hooks/useTranslate";
import { memo } from 'react';

interface ISelectListProps {
  title?: string;
  id?: string;
  onChange?: Function;
  options?: Array<{
    name: string;
    value: string;
    key?: string;
  }>;
  value: string;
  disabled?: boolean;
}

export const SelectList = memo((props: ISelectListProps) => {
  const {
    title,
    onChange,
    disabled = false,
    id = '',
    options = [],
    value,
  } = props;

  const { t } = useTranslate();

  const handleChange = (e: any) => {
    onChange && onChange(e.target.value)
  };

  return (
    <>
      {title && (
        <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
          {title}
        </label>
      )}
      <select
        multiple
        disabled={disabled}
        id={`select-${id}`}
        onChange={handleChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-100 focus:border-blue-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-100 dark:focus:border-blue-100'
      >
        <option
            value={""}
            key={"All"}
            selected={!value}
          >
            {t("All")}
          </option>
        {options.map((opt: any) => (
          <option
            value={opt.value}
            key={opt.key || opt.value}
            selected={value === opt.value}
          >
            {opt.name}
          </option>
        ))}
      </select>
    </>
  );
});
