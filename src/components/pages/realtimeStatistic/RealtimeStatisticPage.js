import React, { useEffect, useState } from "react";
import { Layout, message } from "antd";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import RealtimeStatUpper from "../../organisms/realtimeStatUpper/RealtimeStatUpper";
import StatContainer from "../../organisms/videoContainer/StatContainer";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import TimeTableCard from "../../molecules/tableCard/TimeTableCard";

import "./style.less";

const RealtimeStatisticPage = (props) => {
	const { camAddress, camera, cameraCode, baseURL, trafficURL } = props;
	const { Content } = Layout;

	const [trafficTotalData, setTrafficTotalData] = useState([]);

	const [currTime, setCurrTime] = useState(moment(new Date()));
	const [refresh, setRefresh] = useState(false);
	// const date = moment(new Date()).format("YYYY-MM-DD");
	// const date = moment("2020-03-11 00:00:00").format("YYYY-MM-DD");
	const date = "2021-03-16";

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
	var camCode = cameraCode.length === 0 ? "0001" : cameraCode;
	// var camCode = cameraCode.length === 0 ? "0004" : cameraCode;
	var currTimeStr = currTime.format("HH:mm:ss");
	// console.log(typeof currTimeStr);
	useEffect(() => {
		axiosAsync();
	}, []);

	useEffect(() => {
		console.log("refresh", refresh);
		if (refresh) {
			axiosAsync();
		}
	}, [refresh]);

	const axiosAsync = () => {
		axios
			.get(
				`${baseURL}${trafficURL}/daily?camCode=${camCode}&startDate=${date}&endTime=${date} ${currTimeStr}&axis=time&laneNumber=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setTrafficTotalData(res.data);
				message.success("Refresh 성공");
				setRefresh(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
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
							<StatContainer camName={camName} httpAddress={cameraAddress} />
							<div className="realtime-statistic-graph">
								<GeneralVisualization
									page="REALSTATISTIC"
									period="DAY"
									startDate={date}
									endTime={date}
									currentTime={currTimeStr}
								/>
							</div>
						</div>
						<TimeTableCard
							period="DAY"
							page="REALSTATISTIC"
							tableKey="first"
							currentLaneNum="0"
							trafficTotalData={trafficTotalData}
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
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
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
