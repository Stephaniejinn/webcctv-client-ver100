import React, { useState } from "react";
import { DatePicker, ConfigProvider, Typography } from "antd";
import moment from "moment";
import locale from "antd/es/locale/ko_KR";
import "moment/locale/ko";

import "./style.less";

const MyDatePicker = (props) => {
	const { period, setTempStartDate, setTempEndTime } = props;
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
						placeholder="확인을 희망하는 주간을 선택하세요"
					/>
					{week[1] !== "Invalid date" && week[1] && (
						<Text type="secondary" style={{ marginLeft: 10, marginTop: 5 }}>
							{week[0]} ~ {week[1]}
						</Text>
					)}
				</div>
			) : period === "MONTH" ? (
				<DatePicker
					onChange={onChange}
					picker="month"
					placeholder="확인을 희망하는 월간을 선택하세요"
				/>
			) : period === "SEARCH" ? (
				<RangePicker onChange={onChange} />
			) : (
				<DatePicker
					onChange={onChange}
					placeholder="확인을 희망하는 날짜를 선택하세요"
					showToday={false}
				/>
			)}
		</ConfigProvider>
	);
};

export default MyDatePicker;
