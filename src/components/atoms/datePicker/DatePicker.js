import React, { useState } from "react";
import { DatePicker, ConfigProvider, Typography } from "antd";
import locale from "antd/es/locale/ko_KR";
import "moment/locale/ko";
import moment from "moment";

import "./style.less";

const MyDatePicker = (props) => {
	const { period, setTempStartDate, setTempEndTime } = props;
	const { RangePicker } = DatePicker;
	const { Text } = Typography;
	const [week, setWeek] = useState([]);

	// useEffect(() => {
	// 	if (period === "WEEK" && weekStartDate) {
	// 		setTempStartDate(weekStartDate);
	// 		setTempEndTime(weekEndTime);
	// 	} else if (period === "MONTH" && monthStartDate) {
	// 		setTempStartDate(monthStartDate);
	// 		setTempEndTime(monthEndTime);
	// 	} else if (period === "SEARCH" && searchStartDate) {
	// 		setTempStartDate(searchStartDate);
	// 		setTempEndTime(searchEndTime);
	// 	} else if (period === "DAY" && dayStartDate) {
	// 		setTempStartDate(dayStartDate);
	// 		setTempEndTime(dayEndTime);
	// 	} else if (period === "OVERSPEED" && overSpeedStartDate) {
	// 		setTempStartDate(overSpeedStartDate);
	// 		setTempEndTime(overSpeedEndTime);
	// 	} else {
	// 		return () => {
	// 			setTempStartDate("");
	// 			setTempEndTime("");
	// 		};
	// 	}
	// }, [period]);

	// var defaultDay = dayStartDate && moment(dayStartDate);
	// var defaultWeek = weekStartDate && moment(weekStartDate);
	// var defaultMonth = monthStartDate && moment(monthStartDate, "YYYY-MM");
	// var defaultOverSpeed = overSpeedStartDate && moment(overSpeedStartDate);
	// var defaultSearch =
	// 	searchStartDate || searchEndTime
	// 		? [moment(searchStartDate), moment(searchEndTime)]
	// 		: null;

	moment.locale("ko", {
		week: {
			dow: 7,
		},
	});

	const onChange = (date, dateString) => {
		var startDate = "";
		var endDate = "";
		if (period === "WEEK") {
			startDate = moment(date).startOf("week").format("YYYY-MM-DD");
			endDate = moment(date).endOf("week").format("YYYY-MM-DD");
			setWeek([startDate, endDate]);
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
				<div className="week-description">
					<DatePicker onChange={onChange} picker="week" placeholder="주 선택" />
					{week[1] && (
						<Text type="secondary" style={{ marginLeft: 10, marginTop: 5 }}>
							{week[0]} ~ {week[1]}
						</Text>
					)}
				</div>
			) : period === "MONTH" ? (
				<DatePicker onChange={onChange} picker="month" placeholder="월 선택" />
			) : period === "SEARCH" ? (
				<RangePicker onChange={onChange} />
			) : (
				<DatePicker
					onChange={onChange}
					placeholder="날짜 선택"
					showToday={false}
				/>
			)}
		</ConfigProvider>
	);
};

export default MyDatePicker;
