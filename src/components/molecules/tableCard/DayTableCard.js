import React from "react";
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
} from "react-device-detect";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { Collapse, Typography, Divider, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import DTFirstTable from "../timeStatisticsTable/dayTable/DTFirstTable";
import DTOverSpeedTable from "../timeStatisticsTable/dayTable/DTOverSpeedTable";
import DTSecondTable from "../timeStatisticsTable/dayTable/DTSecondTable";

import WTSecondTable from "../timeStatisticsTable/weekTable/WTSecondTable";
import WTFirstTable from "../timeStatisticsTable/weekTable/WTFirstTable";

import MTFirstTable from "../timeStatisticsTable/monthTable/MTFirstTable";
import MTSecondTable from "../timeStatisticsTable/monthTable/MTSecondTable";
import "./style.less";

const DayTableCard = (props) => {
	const {
		period,
		tableKey,
		currentLaneNum,
		timeClassification,

		// isLoadingTrafficTotal,
		// isLoadingTrafficLane,
		// isLoadingPedestrians,
		// trafficTotalData,
		// trafficLaneData,
		// pedestriansData,

		startDate,
		endTime,
		interval,
		camera,
	} = props;

	const group = timeClassification ? "시간별" : "차선별";

	return (
		<div className="table-card">
			<BrowserView>
				<h1> This is rendered only in browser </h1>
				{period === "DAY" ? (
					tableKey === "first" ? (
						<DTFirstTable
							currentLaneNum={parseInt(currentLaneNum)}
							// isLoadingTrafficTotal={isLoadingTrafficTotal}
							// isLoadingTrafficLane={isLoadingTrafficLane}
							// isLoadingPedestrians={isLoadingPedestrians}
							// trafficTotalData={trafficTotalData}
							// trafficLaneData={trafficLaneData}
							// pedestriansData={pedestriansData}
							startDate={startDate}
							endTime={endTime}
							timeClassification={timeClassification}
							interval={interval}
						/>
					) : tableKey === "overSpeed" ? (
						<h1>과속 데이터 테이블</h1>
					) : (
						// <DTOverSpeedTable
						// 	startDate={startDate}
						// 	endTime={endTime}
						// 	timeClassification={timeClassification}
						// 	interval={interval}
						// />
						<DTSecondTable
							startDate={startDate}
							endTime={endTime}
							timeClassification={timeClassification}
							interval={interval}
						/>
					)
				) : period === "WEEK" ? (
					tableKey === "first" ? (
						<WTFirstTable
							startDate={startDate}
							endTime={endTime}
							timeClassification={timeClassification}
							interval={interval}
						/>
					) : tableKey === "overSpeed" ? (
						<h1>과속 데이터 테이블</h1>
					) : (
						// <DTOverSpeedTable
						// 	startDate={startDate}
						// 	endTime={endTime}
						// 	timeClassification={timeClassification}
						// 	interval={interval}
						// />

						<WTSecondTable
							startDate={startDate}
							endTime={endTime}
							timeClassification={timeClassification}
							interval={interval}
						/>
					)
				) : tableKey === "first" ? (
					<MTFirstTable
						startDate={startDate}
						endTime={endTime}
						timeClassification={timeClassification}
						interval={interval}
					/>
				) : tableKey === "overSpeed" ? (
					<h1>과속 데이터 테이블</h1>
				) : (
					// <DTOverSpeedTable
					// 	startDate={startDate}
					// 	endTime={endTime}
					// 	timeClassification={timeClassification}
					// 	interval={interval}
					// />
					<MTSecondTable
						startDate={startDate}
						endTime={endTime}
						timeClassification={timeClassification}
						interval={interval}
					/>
				)}
			</BrowserView>
			<MobileView>
				<h1> This is rendered only on mobile </h1>
			</MobileView>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		camera: state.location.camera,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationCodeInfo: () => {
			dispatch(actions.getLocation());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(DayTableCard);
