import React from "react";
import { Layout } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import * as actions from "../../../actions";

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
	// const date = moment(new Date()).format("YYYY-MM-DD");
	const currentTime = moment(new Date()).format("HH:mm:ss");
	const date = "2020-03-11";

	return (
		<div className="realtime-statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<RealtimeStatUpper />
						<div className="realtime-statistic-video-and-graph">
							<VideoContainer camName={camera} httpAddress={camAddress} />
							<div className="realtime-statistic-graph">
								<GeneralVisualization
									page="REALSTATISTIC"
									startDate={date}
									endTime={date}
									currentTime={currentTime}
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
							currentTime={currentTime}
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
