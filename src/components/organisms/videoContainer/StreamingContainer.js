import React from "react";
import { Card, Typography } from "antd";

// import axios from "axios";
// import { connect } from "react-redux";
// import * as actions from "../../../actions";

import Video from "../../molecules/video/Video";
import StreamingGenVisualization from "../generalVisualization/StreamingGenVisualization";

import "./style.less";

const { Title } = Typography;

const VideoContainer = ({
	page,
	camName,
	httpAddress,
	date,
	currentTime,
	realtimeCamCode,
}) => {
	return (
		<div className="video-container">
			<Title level={5}>{camName}</Title>
			<div className="video-container-streamming">
				<Card>{httpAddress && <Video source={httpAddress} />}</Card>
			</div>
			<div className="video-container-graph">
				<StreamingGenVisualization
					page={page}
					startDate={date}
					endTime={date}
					currentTime={currentTime}
					realtimeCamCode={realtimeCamCode}
				/>
			</div>
		</div>
	);
};
// const mapStateToProps = (state) => {
// 	return {
// 		city: state.location.city,
// 		district: state.location.district,
// 		road: state.location.road,
// 		spot: state.location.spot,
// 		camera: state.location.camera,
// 		baseURL: state.baseURL.baseURL,
// 	};
// };
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getLocationInfo: () => {
// 			dispatch(actions.getLocation());
// 		},
// 		getBaseURL: () => {
// 			dispatch(actions.getURL());
// 		},
// 	};
// };
export default VideoContainer;
