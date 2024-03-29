import React from "react";

import DayTable from "../StatisticsTable/dayTable/DLFirstTable";
import MontnTable from "../StatisticsTable/monthTable/MLFirstTable";
import TableDescription from "../tableDescription/TableDescription";
import WeekTable from "../StatisticsTable/weekTable/WLFirstTable";

const LaneTableCard = (props) => {
	const { period, tableKey, startDate, endTime, trafficTotalData } = props;

	return (
		<div className="table-card">
			<TableDescription
				period={period}
				startDate={startDate}
				endTime={endTime}
				timeClassification={false}
				tableKey={tableKey}
			/>
			{period === "DAY" ? (
				<DayTable trafficTotalData={trafficTotalData} />
			) : period === "WEEK" ? (
				<WeekTable trafficTotalData={trafficTotalData} />
			) : (
				<MontnTable trafficTotalData={trafficTotalData} />
			)}
		</div>
	);
};

export default LaneTableCard;
