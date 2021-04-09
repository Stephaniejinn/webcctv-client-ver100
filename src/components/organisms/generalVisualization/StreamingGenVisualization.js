import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";
import VehicleRatio from "../../charts/doughnutChart/VehicleRatio";
// import OverSpeedTinyBar from "../../charts/tinyBarChart/overSpeed";
import OverSpeedBar from "../../charts/barChart/GenOverSpeed";

import "./style.less";

const StreamingGeneralVisualization = (props) => {
	const {
		startDate,
		endTime,
		currentTime,
		realtimeCamCode,
		baseURL,
		trafficURL,
	} = props;

	const [isLoadingTraffic, setLoadingTraffic] = useState(true);
	const [trafficData, setTrafficData] = useState([]);

	useEffect(() => {
		setLoadingTraffic(true);
		setTrafficData([]);
		getTrafficData();
	}, [realtimeCamCode, startDate, endTime]);

	const getTrafficData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}/daily?camCode=${realtimeCamCode}&startDate=${startDate}&endTime=${endTime} ${currentTime}&axis=time&laneNumber=0`,
				// `${baseURL}/statistics/road-traffic/daily?camCode=0004&startDate=2020-03-15&endTime=2020-03-15 23:59:59&axis=time&laneNumber=0`,

				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setTrafficData(res.data);
				setLoadingTraffic(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="general-graph-layout">
			{isLoadingTraffic ? (
				<div
					style={{
						marginTop: 20,
						marginBottom: 20,
						textAlign: "center",
						paddingTop: 30,
						paddingBottom: 30,
					}}
				>
					<Spin size="large" />
				</div>
			) : (
				<div className="general-graph-card">
					<VisualizationCard
						title="차종별 통행량(대) 누계"
						chart={<VehicleRatio trafficData={trafficData} />}
					/>
					<VisualizationCard
						title="차종별 과속차량(대) 누계"
						chart={<OverSpeedBar trafficData={trafficData} />}
					/>
				</div>
			)}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationCodeInfo: () => {
			dispatch(actions.getLocationCode());
		},
		getBaseURL: () => {
			dispatch(actions.getURL());
		},
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StreamingGeneralVisualization);
