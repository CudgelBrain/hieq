import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from 'assets/images/calendar.svg';

const InputField = React.forwardRef((props: any, ref) => {
  const { value, onClick } = props;
  return (
    <div className='input-group ig-append' onClick={onClick}>
      <input ref={ref} {...props} type='text' className='form-control' value={value} />
      <div className='input-group-append input-click'>
        <span className='input-group-text'>
          <img src={calendarIcon} height='20' alt='' />
        </span>
      </div>
    </div>
  );
});

InputField.displayName = 'InputField';

interface Props {
  name: string;
  control?: any;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  showTimeSelect?: boolean;
}

const DateSelector = React.forwardRef<HTMLFormElement, Props>(
  ({ name, minDate, maxDate, control, format = 'dd/MM/yyyy', showTimeSelect = false }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, ...fieldProps } }) => {
          const handleOnchange = (date: Date | null) => onChange(date);
          return (
            <DatePicker
              {...fieldProps}
              selected={value}
              todayButton='Today'
              dateFormat={format}
              maxDate={maxDate ?? null}
              minDate={minDate ?? new Date()}
              showTimeSelect={showTimeSelect}
              onChange={(date) => handleOnchange(date)}
              customInput={<InputField />}
            />
          );
        }}
      />
    );
  },
);

export default DateSelector;
