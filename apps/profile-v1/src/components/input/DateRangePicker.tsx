import { memo, useState } from 'react';
import { DatePicker } from '.';

export interface IDateRangePicker {
  onChange?: (dateState: IDateState) => void;
}

export interface IDateState {
  start?: Date;
  end?: Date;
}

export const DateRangePicker = memo(({ onChange }: IDateRangePicker) => {
  const [date, setDate] = useState<IDateState>({
    start: new Date(),
    end: new Date(),
  });

  const handleChange = (dateState: Partial<IDateState>) => {
    setDate(prev => ({
      ...prev,
      ...dateState,
    }));
    onChange &&
      onChange({
        ...date,
        ...dateState,
      });
  };

  return (
    <div className='w-full sm:w-auto flex flex-wrap flex-row justify-start items-center m-1 my-2'>
      <div className='flex flex-col text-blue-500'>
        <div className='text-xs font-bold'>Ngày bắt đầu:</div>
        <DatePicker
          maxDate={date.end}
          onSelectedDateChanged={_date => {
            handleChange({ start: new Date(_date) });
          }}
        />
      </div>
      <div className='text-sm mx-4'> - </div>
      <div className='flex flex-col'>
        <div className='text-xs font-bold text-blue-500'>Ngày kết thúc:</div>
        <DatePicker
          minDate={date.start}
          onSelectedDateChanged={_date => {
            handleChange({ end: new Date(_date) });
          }}
        />
      </div>
    </div>
  );
});
