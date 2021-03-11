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

import DLFirstTable from "../StatisticsTable/dayTable/DLFirstTable";
// import DTFirstTable from "../timeStatisticsTable/dayTable/DTFirstTable";
// import DTOverSpeedTable from "../timeStatisticsTable/dayTable/DTOverSpeedTable";
// import DTSecondTable from "../timeStatisticsTable/dayTable/DTSecondTable";

// import WTSecondTable from "../timeStatisticsTable/weekTable/WTSecondTable";
// import WTFirstTable from "../timeStatisticsTable/weekTable/WTFirstTable";

// import MTFirstTable from "../timeStatisticsTable/monthTable/MTFirstTable";
// import MTSecondTable from "../timeStatisticsTable/monthTable/MTSecondTable";
import "./style.less";

const LaneTableCard = (props) => {
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
		// interval,
		camera,
	} = props;

	const group = timeClassification ? "시간별" : "차선별";

	return (
		<div className="table-card">
			<BrowserView>
				<h1> This is rendered only in browser </h1>
				{period === "DAY" ? (
					tableKey === "first" ? (
						<DLFirstTable
							currentLaneNum={parseInt(currentLaneNum)}
							startDate={startDate}
							endTime={endTime}
							timeClassification={timeClassification}
						/>
					) : tableKey === "overSpeed" ? (
						<h1>과속 데이터 테이블</h1>
					) : (
						<h1>2차 데이터 테이블</h1>
					)
				) : period === "WEEK" ? (
					tableKey === "first" ? (
						<h1>1차 데이터 테이블</h1>
					) : tableKey === "overSpeed" ? (
						<h1>과속 데이터 테이블</h1>
					) : (
						<h1>2차 데이터 테이블</h1>
					)
				) : tableKey === "first" ? (
					<h1>1차 데이터 테이블</h1>
				) : tableKey === "overSpeed" ? (
					<h1>과속 데이터 테이블</h1>
				) : (
					<h1>2차 데이터 테이블</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(LaneTableCard);
