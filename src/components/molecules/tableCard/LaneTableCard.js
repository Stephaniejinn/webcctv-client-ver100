import React from "react";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { Collapse, Typography, Divider, Button } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

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
		startDate,
		endTime,
		// interval,
		camera,
	} = props;

	const group = timeClassification ? "시간별" : "차선별";

	return (
		<div className="table-card">
			<h1> This is rendered only in browser </h1>
			{period === "DAY" ? (
				<DLFirstTable
					currentLaneNum={parseInt(currentLaneNum)}
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
				/>
			) : period === "WEEK" ? (
				<DLFirstTable
					currentLaneNum={parseInt(currentLaneNum)}
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
				/>
			) : (
				<DLFirstTable
					currentLaneNum={parseInt(currentLaneNum)}
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
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
export default connect(mapStateToProps, mapDispatchToProps)(LaneTableCard);
