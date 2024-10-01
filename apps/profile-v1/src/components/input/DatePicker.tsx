import { Datepicker, DatepickerProps } from 'flowbite-react';

export interface IDatePicker extends DatepickerProps {
}

export const DatePicker = ({ ...props }: IDatePicker) => {

  return <Datepicker {...props} />
}