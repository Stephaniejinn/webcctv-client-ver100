import React, { useEffect, useState } from "react";
import { Layout, message } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import RealtimeStatUpper from "../../organisms/realtimeStatUpper/RealtimeStatUpper";
import VideoContainer from "../../organisms/videoStreaming/VideoContainer";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import TimeTableCard from "../../molecules/tableCard/TimeTableCard";

import "./style.less";

const RealtimeStatisticPage = (props) => {
	const { camAddress, camera } = props;
	const { Content } = Layout;
	const [currTime, setCurrTime] = useState(moment(new Date()));
	const [refresh, setRefresh] = useState(false);
	// const date = moment(new Date()).format("YYYY-MM-DD");
	// const currentTime = moment(new Date()).format("HH:mm:ss");

	const date = "2020-03-11";

	var cameraAddress = "";
	var camName = "";
	if (camAddress.length === 0 || camera.length === 0) {
		cameraAddress =
			"https://globalbridge.synology.me:4000/m3u8VideoStream.m3u8";
		camName = "수인사거리-1 [하행]";
	} else {
		cameraAddress = camAddress;
		camName = camera;
	}

	useEffect(() => {
		console.log("refresh", refresh);
		if (refresh) {
			message.success("Refresh 성공");
			setRefresh(false);
		}
	}, [refresh]);

	return (
		<div className="realtime-statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<RealtimeStatUpper
							currTime={currTime}
							setCurrTime={setCurrTime}
							setRefresh={setRefresh}
						/>
						<div className="realtime-statistic-video-and-graph">
							<VideoContainer camName={camName} httpAddress={cameraAddress} />
							<div className="realtime-statistic-graph">
								<GeneralVisualization
									page="REALSTATISTIC"
									startDate={date}
									endTime={date}
									currentTime={currTime.format("HH:mm:ss")}
								/>
							</div>
						</div>
						<TimeTableCard
							period="DAY"
							page="REALSTATISTIC"
							tableKey="first"
							currentLaneNum="0"
							startDate={date}
							endTime={date}
							currentTime={currTime}
							interval="15M"
						/>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		camAddress: state.locationCode.camAddress,
		camera: state.location.camera,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationInfo: () => {
			dispatch(actions.getLocation());
		},
		getLocationCodeInfo: () => {
			dispatch(actions.getLocationCode());
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RealtimeStatisticPage);
