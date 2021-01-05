import React from 'react';
import { DatePicker } from 'antd';

const myDatePicker = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <DatePicker onChange={onChange} />
    </>
  );
};
export default myDatePicker;
