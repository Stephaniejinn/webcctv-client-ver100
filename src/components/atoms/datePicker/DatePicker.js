import React from "react";
import { DatePicker } from "antd";

const myDatePicker = ({ period }) => {
	const onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	return (
		<>
			{period === "WEEK" ? (
				<DatePicker onChange={onChange} picker="week" placeholder="주 선택" />
			) : period === "MONTH" ? (
				<DatePicker onChange={onChange} picker="month" placeholder="월 선택" />
			) : (
				<DatePicker onChange={onChange} placeholder="날짜 선택" />
			)}
		</>
	);
};
export default myDatePicker;
