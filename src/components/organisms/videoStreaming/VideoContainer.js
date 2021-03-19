import React from "react";
import { Card, Typography } from "antd";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import Video from "../../molecules/video/Video";
import GeneralVisualization from "../generalVisualization/StreamingGenVisualization";

import "./style.less";

const { Title } = Typography;

const VideoContainer = ({
	page,
	camName,
	httpAddress,
	date = "",
	currentTime = "",
	realtimeCamCode = "0004",
}) => {
	return (
		<div className="video-container">
			{page === "STREAMING" && <Title level={5}>{camName}</Title>}
			<div className="video-container-streamming">
				<Card>{httpAddress && <Video source={httpAddress} />}</Card>
			</div>
			{page === "STREAMING" && (
				<div className="video-container-graph">
					<GeneralVisualization
						page={page}
						startDate={date}
						endTime={date}
						currentTime={currentTime}
						// realtimeCamCode={realtimeCamCode}
						realtimeCamCode="0004"
					/>
				</div>
			)}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		city: state.location.city,
		district: state.location.district,
		road: state.location.road,
		spot: state.location.spot,
		camera: state.location.camera,
		baseURL: state.baseURL.baseURL,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationInfo: () => {
			dispatch(actions.getLocation());
		},
		getBaseURL: () => {
			dispatch(actions.getURL());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);
