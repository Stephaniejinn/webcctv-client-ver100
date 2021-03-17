import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";
import TrafficPie from "../../charts/doughnutChart/Traffic";
import AvgSpeedGauge from "../../charts/gaugeChart/AvgSpeed";
import AvgSpeedTinyBar from "../../charts/tinyBarChart/AvgSpeed";
import OverSpeedTinyBar from "../../charts/tinyBarChart/overSpeed";

import "./style.less";

const GeneralVisualization = (props) => {
	const {
		page = "DEFAULT",
		startDate,
		endTime,
		cameraCode,
		currentTime = "23:59:59",
		realtimeCamCode = "",
		baseURL,
	} = props;

	const trafficURL = "/statistics/traffic?groupBy=time";
	const violationURL = "/violations/speeding?groupBy=lane";
	// const group = timeClassification ? "time" : "lane";
	const [isLoadingTraffic, setLoadingTraffic] = useState(true);
	const [isLoadingViolation, setLoadingViolation] = useState(true);

	const [trafficData, setTrafficData] = useState([]);
	const [violationData, setViolationData] = useState([]);

	const camCode = page === "STREAMING" ? realtimeCamCode : cameraCode;

	useEffect(() => {
		getTrafficData();
		getViolationData();
	}, [camCode, startDate, endTime]);

	const getTrafficData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}&camCode=0004&startDate=${startDate}&endTime=${endTime} ${currentTime}&interval=15M&limit=0&offset=0`,
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
	const getViolationData = () => {
		axios
			.get(
				`${baseURL}${violationURL}&camCode=0004&startDate=${startDate}&endTime=${startDate} ${currentTime}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setViolationData(res.data);
				setLoadingViolation(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const TrafficPieChart = (
		<TrafficPie isLoading={isLoadingTraffic} trafficData={trafficData} />
	);
	const GaugeChart = (
		<AvgSpeedGauge isLoading={isLoadingTraffic} trafficData={trafficData} />
	);
	var AvgSpeedTinyBarChart = (
		<AvgSpeedTinyBar isLoading={isLoadingTraffic} trafficData={trafficData} />
	);

	var OverSpeedTinyBarChart = (
		<OverSpeedTinyBar
			isLoading={isLoadingViolation}
			violationData={violationData}
		/>
	);

	return (
		<div className="general-graph-layout">
			{page === "STREAMING" ? (
				<div className="general-graph-card">
					<VisualizationCard title="차종별 통행량" chart={TrafficPieChart} />
					<VisualizationCard
						title="차종별 과속차량"
						chart={OverSpeedTinyBarChart}
					/>
				</div>
			) : (
				<>
					<div className="general-graph-card">
						<VisualizationCard title="차종별 통행량" chart={TrafficPieChart} />
						<VisualizationCard
							title="차종별 과속차량"
							chart={OverSpeedTinyBarChart}
						/>
					</div>
					<div className="general-graph-card">
						<VisualizationCard title="평균속도" chart={GaugeChart} />
						<VisualizationCard
							title="차종별 평균속도"
							chart={AvgSpeedTinyBarChart}
						/>
					</div>
				</>
			)}
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
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
)(GeneralVisualization);
