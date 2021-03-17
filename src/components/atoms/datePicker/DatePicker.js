import React, { useState } from "react";
import { DatePicker, ConfigProvider, Typography } from "antd";
// import locale from "antd/lib/locale/ko_KR";
import locale from "antd/es/locale/ko_KR";
import "moment/locale/ko";
import moment from "moment";

import "./style.less";

const MyDatePicker = ({ period, setTempStartDate, setTempEndTime }) => {
	const { RangePicker } = DatePicker;
	const { Text } = Typography;
	const [week, setWeek] = useState([]);

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
					<DatePicker
						onChange={onChange}
						picker="week"
						placeholder="주 선택"
						// format="YYYY-MM-DD WW"
					/>
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
				<DatePicker onChange={onChange} placeholder="날짜 선택" />
			)}
		</ConfigProvider>
	);
};
export default MyDatePicker;
