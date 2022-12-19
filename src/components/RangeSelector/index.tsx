import React, { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from 'assets/images/calendar.svg';
import ko from 'date-fns/esm/locale/ko/index.js';


import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';


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

// InputField.displayName = 'InputField';

const RangeSelector: React.FC<Props> = ({ startDate, endDate, label, setStartDate, setEndDate }) => {


  // const [state, setState] = useState({
  //   102      start: moment().subtract(29, 'days'),
  //   103      end: moment(),
  //   104    });
  //   105    const { start, end } = state;
  const handleCallback = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);

  };
  label = moment(startDate).subtract(29, 'days').format('MMMM D, YYYY') + ' - ' + moment(endDate).format('MMMM D, YYYY');
  return (
    < DateRangePicker
      initialSettings={{
        alwaysShowCalendars: true,
        startDate: startDate,
        endDate: endDate,
        ranges: {
          Today: [moment().toDate(), moment().toDate()],
          Yesterday: [
            moment().subtract(1, 'days').toDate(),
            moment().subtract(1, 'days').toDate(),
          ],
          'Last 7 Days': [
            moment().subtract(6, 'days').toDate(),
            moment().toDate(),
          ],
          'Last 30 Days': [
            moment().subtract(29, 'days').toDate(),
            moment().toDate(),
          ],
          'This Month': [
            moment().startOf('month').toDate(),
            moment().endOf('month').toDate(),
          ],
          'Last Month': [
            moment().subtract(1, 'month').startOf('month').toDate(),
            moment().subtract(1, 'month').endOf('month').toDate(),
          ],

        },

      }
      }
      onCallback={handleCallback}
    >
      < div
        id="reportrange"
        className="d-flex"
        style={{
          background: '#fff',
          cursor: 'pointer',
          padding: '5px 10px',
          border: '1px solid #ccc',
          width: '80%',
          borderRadius: "4px"
        }}
      >
        <img src={calendarIcon} height='20' alt='' />&nbsp;
        < span > {label}</span > <i className="fa fa-caret-down"></i>
      </div >

    </DateRangePicker >
  )










  // let stDate = moment().subtract(6, "d").format("YYYY-MM-DD")
  // const [dateRange, setDateRange] = useState<(Date | null)[]>([new Date(stDate), new Date()]);
  // React.useEffect(() => {
  //   if (dateRange.length > 1) {
  //     setStartDate(moment(dateRange[0]).format("YYYY-MM-DD"))
  //     setEndDate(moment(dateRange[1]).format("YYYY-MM-DD"))
  //   }
  // }, [dateRange])
  // return (
  //   <DatePicker
  //     selectsRange={true}
  //     dateFormat='dd LLL yyyy'
  //     startDate={startDate ?? dateRange[0]}
  //     endDate={endDate ?? dateRange[1]}
  //     customInput={<InputField label={label} />}
  //     onChange={(dateRange) => setDateRange(dateRange)}
  //   />
  // );
};

export default RangeSelector;
