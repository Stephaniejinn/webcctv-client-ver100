import React from "react";
import { Card, Typography } from "antd";

import Video from "../../molecules/video/Video";
import StreamingGenVisualization from "../generalVisualization/StreamingGenVisualization";
import "./style.less";

const { Title } = Typography;

const VideoContainer = ({
	camName,
	httpAddress,
	date,
	currentTime,
	realtimeCamCode,
	setLoggedIn,
}) => {
	return (
		<div className="video-container">
			<Title level={5}>{camName}</Title>
			<div className="video-container-streamming">
				<Card>{httpAddress && <Video source={httpAddress} />}</Card>
			</div>
			<div className="video-container-graph">
				<StreamingGenVisualization
					startDate={date}
					endTime={date}
					currentTime={currentTime}
					realtimeCamCode={realtimeCamCode}
					setLoggedIn={setLoggedIn}
				/>
			</div>
		</div>
	);
};
export default VideoContainer;
