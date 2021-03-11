import React from "react";
import { Card, Typography } from "antd";
import moment from "moment";

// import Video from "../../molecules/video/Video";
import GeneralVisualization from "../generalVisualization/GeneralVisualization";

import "./style.less";

const { Title } = Typography;

const VideoContainer = ({ camName, httpAddress, page }) => {
	// const date = moment(new Date()).format("YYYY-MM-DD");
	const date = "2020-03-11";

	return (
		<div className="video-container">
			{page === "STREAMING" ? <Title level={5}>{camName}</Title> : null}
			<div className="video-container-streamming">
				<Card />
				{/* <Card>{httpAddress && <Video source={httpAddress} />}</Card> */}
			</div>
			{page === "STREAMING" ? (
				<div className="video-container-graph">
					<GeneralVisualization
						timeClassification={true}
						page={page}
						startDate={date}
						endTime={date}
					/>
				</div>
			) : null}
		</div>
	);
};
export default VideoContainer;
