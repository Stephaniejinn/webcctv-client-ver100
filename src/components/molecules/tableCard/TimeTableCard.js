import React from "react";
// import {
// 	BrowserView,
// 	MobileView,
// 	isBrowser,
// 	isMobile,
// } from "react-device-detect";
import TableDescription from "../tableDescription/TableDescription";
import OverSpeedTable from "../StatisticsTable/OverSpeedTable";

import DTFirstTable from "../StatisticsTable/dayTable/DTFirstTable";
import DTSecondTable from "../StatisticsTable/dayTable/DTSecondTable";

import WTSecondTable from "../StatisticsTable/weekTable/WTSecondTable";
import WTFirstTable from "../StatisticsTable/weekTable/WTFirstTable";

import MTFirstTable from "../StatisticsTable/monthTable/MTFirstTable";
import MTSecondTable from "../StatisticsTable/monthTable/MTSecondTable";
import "./style.less";

const TimeTableCard = (props) => {
	const {
		period,
		tableKey,
		currentLaneNum,
		startDate,
		endTime,
		currentTime = "23:59:59",
		interval,
		page = "",
	} = props;

	return (
		<div className="table-card">
			{period === "DAY" ? (
				tableKey === "first" ? (
					<>
						<TableDescription
							period={period}
							startDate={startDate}
							endTime={endTime}
							timeClassification={true}
							tableKey={tableKey}
							page={page}
							currentTime={currentTime}
							// currentLaneNum={parseInt(currentLaneNum)}
						/>
						<DTFirstTable
							currentLaneNum={parseInt(currentLaneNum)}
							startDate={startDate}
							endTime={endTime}
							interval={interval}
							currentTime={currentTime}
						/>
					</>
				) : parseInt(currentLaneNum) === 0 ? (
					<>
						<TableDescription
							period={period}
							startDate={startDate}
							endTime={endTime}
							timeClassification={true}
							tableKey={tableKey}
						/>
						{tableKey === "overSpeed" ? (
							<OverSpeedTable startDate={startDate} endTime={endTime} />
						) : (
							<DTSecondTable
								startDate={startDate}
								endTime={endTime}
								interval={interval}
							/>
						)}
					</>
				) : null
			) : period === "WEEK" ? (
				tableKey === "first" ? (
					<>
						<TableDescription
							period={period}
							startDate={startDate}
							endTime={endTime}
							timeClassification={true}
							tableKey={tableKey}
						/>
						<WTFirstTable
							startDate={startDate}
							endTime={endTime}
							interval={interval}
						/>
					</>
				) : parseInt(currentLaneNum) === 0 ? (
					<>
						<TableDescription
							period={period}
							startDate={startDate}
							endTime={endTime}
							timeClassification={true}
							tableKey={tableKey}
						/>
						{tableKey === "overSpeed" ? (
							<OverSpeedTable startDate={startDate} endTime={endTime} />
						) : (
							<WTSecondTable
								startDate={startDate}
								endTime={endTime}
								interval={interval}
							/>
						)}
					</>
				) : null
			) : tableKey === "first" ? (
				<>
					<TableDescription
						period={period}
						startDate={startDate}
						endTime={endTime}
						timeClassification={true}
						tableKey={tableKey}
					/>
					<MTFirstTable
						startDate={startDate}
						endTime={endTime}
						interval={interval}
					/>
				</>
			) : parseInt(currentLaneNum) === 0 ? (
				<>
					<TableDescription
						period={period}
						startDate={startDate}
						endTime={endTime}
						timeClassification={true}
						tableKey={tableKey}
					/>
					{tableKey === "overSpeed" ? (
						<OverSpeedTable startDate={startDate} endTime={endTime} />
					) : (
						<MTSecondTable
							startDate={startDate}
							endTime={endTime}
							interval={interval}
						/>
					)}
				</>
			) : null}
		</div>
	);
};

export default TimeTableCard;
