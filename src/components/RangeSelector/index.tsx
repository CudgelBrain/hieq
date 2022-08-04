import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from 'assets/images/calendar.svg';

interface Props {
  label?: string;
  startDate?: Date;
  endDate?: Date;
}

const InputField = forwardRef((props: any, ref) => {
  const { value, onClick, label } = props;
  return (
    <div className='d-flex align-items-center cc-cal'>
      <label className='label mb-0 mr-2'>{label}</label>
      <div className='input-group' onClick={onClick}>
        <div className='input-group-prepend'>
          <span className='input-group-text'>
            <img src={calendarIcon} height='20' alt='' />
          </span>
        </div>
        <input
          ref={ref}
          {...props}
          type='text'
          value={value}
          placeholder={label}
          className='form-control'
        />
      </div>
    </div>
  );
});

InputField.displayName = 'InputField';

const RangeSelector: React.FC<Props> = ({ startDate, endDate, label }) => {
  const [dateRange, setDateRange] = useState<(Date | null)[]>([new Date(), new Date()]);

  return (
    <DatePicker
      selectsRange={true}
      dateFormat='dd LLL yyyy'
      startDate={startDate ?? dateRange[0]}
      endDate={endDate ?? dateRange[1]}
      customInput={<InputField label={label} />}
      onChange={(dateRange) => setDateRange(dateRange)}
    />
  );
};

export default RangeSelector;
