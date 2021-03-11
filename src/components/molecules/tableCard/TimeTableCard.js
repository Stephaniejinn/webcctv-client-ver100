import React from "react";
// import {
// 	BrowserView,
// 	MobileView,
// 	isBrowser,
// 	isMobile,
// } from "react-device-detect";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { Collapse, Typography, Divider, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import DTFirstTable from "../StatisticsTable/dayTable/DTFirstTable";
import DTOverSpeedTable from "../StatisticsTable/dayTable/DTOverSpeedTable";
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
		timeClassification,
		startDate,
		endTime,
		interval,
		camera,
	} = props;

	const group = timeClassification ? "시간별" : "차선별";
	const periodText =
		period === "DAY" ? "일간" : period === "WEEK" ? "주간" : "월간";
	const dataTypeText =
		tableKey === "first" ? "1차" : tableKey === "second" ? "2차" : "과속 ";

	return (
		<div className="table-card">
			<h>
				{periodText} 누적 통계 {dataTypeText} 데이터 분석
			</h>
			{period === "DAY" ? (
				tableKey === "first" ? (
					<DTFirstTable
						currentLaneNum={parseInt(currentLaneNum)}
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
export default connect(mapStateToProps, mapDispatchToProps)(TimeTableCard);
