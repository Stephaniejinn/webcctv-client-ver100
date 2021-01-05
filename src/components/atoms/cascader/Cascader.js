import React from 'react';
import { Cascader } from 'antd';
import locationOptions from './location.json';

const myCascader = () => {
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const filter = (inputValue, path) => {
    return path.some(
      (option) =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1,
    );
  };

  return (
    <>
      <Cascader
        options={locationOptions}
        onChange={onChange}
        placeholder="위치 선택"
        showSearch={{ filter }}
      />
    </>
  );
};
export default myCascader;
