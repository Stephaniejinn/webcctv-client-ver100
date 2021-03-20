import React from "react";

import TableDescription from "../tableDescription/TableDescription";
import DLFirstTable from "../StatisticsTable/dayTable/DLFirstTable";

import "./style.less";

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
				<DLFirstTable trafficTotalData={trafficTotalData} />
			) : period === "WEEK" ? (
				<DLFirstTable trafficTotalData={trafficTotalData} />
			) : (
				<DLFirstTable trafficTotalData={trafficTotalData} />
			)}
		</div>
	);
};

export default LaneTableCard;
