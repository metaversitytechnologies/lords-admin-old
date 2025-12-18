import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';

interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  className?: string;
}

const ReusableDatePicker: React.FC<DatePickerProps> = ({ selected, onChange, className }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      className={`form-control ${className}`}
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default ReusableDatePicker;
