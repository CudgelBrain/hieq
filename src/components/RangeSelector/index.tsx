import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from 'assets/images/calendar.svg';
import ko from 'date-fns/esm/locale/ko/index.js';

interface Props {
  label?: string;
  startDate?: Date;
  endDate?: Date;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
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

const RangeSelector: React.FC<Props> = ({ startDate, endDate, label, setStartDate, setEndDate }) => {
  let stDate = moment().subtract(6, "d").format("YYYY-MM-DD")
  const [dateRange, setDateRange] = useState<(Date | null)[]>([new Date(stDate), new Date()]);
  React.useEffect(() => {
    if (dateRange.length > 1) {
      setStartDate(moment(dateRange[0]).format("YYYY-MM-DD"))
      setEndDate(moment(dateRange[1]).format("YYYY-MM-DD"))
    }
  }, [dateRange])
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
