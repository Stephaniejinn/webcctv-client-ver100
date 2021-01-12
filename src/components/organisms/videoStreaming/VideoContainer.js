import React from "react";
import { Card, Typography } from "antd";

// import Video from "../../molecules/video/Video";
import GeneralVisualization from "../generalVisualization/GeneralVisualization";

import "./style.less";

const { Title } = Typography;

const VideoContainer = ({ camName, httpAddress, page }) => {
	return (
		<div className="video-container">
			{page === "STREAMING" ? <Title level={5}>{camName}</Title> : null}
			<div className="video-container-streamming">
				<Card />
				{/* <Card>{httpAddress && <Video source={httpAddress} />}</Card> */}
			</div>
			{page === "STREAMING" ? (
				<div className="video-container-graph">
					<GeneralVisualization page={page} />
				</div>
			) : null}
		</div>
	);
};
export default VideoContainer;
