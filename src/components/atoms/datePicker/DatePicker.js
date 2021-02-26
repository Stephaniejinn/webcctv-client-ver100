import React from "react";
import { DatePicker, ConfigProvider } from "antd";
// import locale from "antd/lib/locale/ko_KR";
import locale from "antd/es/locale/ko_KR";
import "moment/locale/ko";

import moment from "moment";

const MyDatePicker = ({ period, setTempStartDate, setTempEndTime }) => {
	const { RangePicker } = DatePicker;

	moment.locale("ko", {
		week: {
			dow: 1,
		},
	});
	const onChange = (date, dateString) => {
		var startDate = "";
		var endDate = "";
		if (period === "WEEK") {
			startDate = moment(date).day(1).format("YYYY-MM-DD");
			endDate = moment(date).day(7).format("YYYY-MM-DD");
		} else if (period === "MONTH") {
			startDate = moment(date).startOf("month").format("YYYY-MM-DD");
			endDate = moment(date).endOf("month").format("YYYY-MM-DD");
		} else if (period === "SEARCH") {
			startDate = dateString[0];
			endDate = dateString[1];
		} else {
			startDate = endDate = dateString;
		}
		setTempStartDate(startDate);
		setTempEndTime(endDate);
	};

	return (
		<ConfigProvider locale={locale}>
			{period === "WEEK" ? (
				<DatePicker
					onChange={onChange}
					picker="week"
					placeholder="주 선택"
					// format="YYYY-MM-DD WW"
				/>
			) : period === "MONTH" ? (
				<DatePicker onChange={onChange} picker="month" placeholder="월 선택" />
			) : period === "SEARCH" ? (
				<RangePicker onChange={onChange} />
			) : (
				<DatePicker onChange={onChange} placeholder="날짜 선택" />
			)}
		</ConfigProvider>
	);
};
export default MyDatePicker;
