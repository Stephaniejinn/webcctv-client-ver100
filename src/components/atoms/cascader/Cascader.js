import React from "react";
import { Cascader } from "antd";
import locationOptions from "./location.json";

const MyCascader = ({ size }) => {
	const onChange = (value, selectedOptions) => {
		console.log(value, selectedOptions);
	};

	const filter = (inputValue, path) => {
		return path.some(
			(option) =>
				option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);
	};

	return (
		<>
			<Cascader
				options={locationOptions}
				size={size}
				expandTrigger="hover"
				onChange={onChange}
				placeholder="위치 선택"
				showSearch={{ filter }}
			/>
		</>
	);
};
export default MyCascader;
