import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import TrafficPie from "../../charts/doughnutChart/Traffic";
import AvgSpeedGauge from "../../charts/gaugeChart/AvgSpeed";
import AvgSpeedTinyBar from "../../charts/tinyBarChart/AvgSpeed";
import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";

import "./style.less";

const GeneralVisualization = (props) => {
	const {
		page = "DEFAULT",
		period,
		startDate,
		endTime,
		interval,
		cameraCode,
		baseURL,
	} = props;

	const currentURL = "/statistics/traffic?groupBy=time";
	// const group = timeClassification ? "time" : "lane";
	const [isLoading, setLoading] = useState(true);
	const [trafficData, setTrafficData] = useState([]);

	useEffect(() => {
		axios
			.get(
				`${baseURL}${currentURL}&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59&interval=15M&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setTrafficData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const TrafficPieChart = (
		<TrafficPie isLoading={isLoading} trafficData={trafficData} />
	);
	const GaugeChart = (
		<AvgSpeedGauge isLoading={isLoading} trafficData={trafficData} />
	);
	var AvgSpeedTinyBarChart = (
		<AvgSpeedTinyBar isLoading={isLoading} trafficData={trafficData} />
	);
	return (
		<div className="general-graph-layout">
			{page === "STREAMING" ? (
				<div className="general-graph-card">
					<VisualizationCard title="차종별 통행량" chart={TrafficPieChart} />
					<VisualizationCard title="차종별 과속차량" />
				</div>
			) : (
				<>
					<div className="general-graph-card">
						<VisualizationCard title="차종별 통행량" chart={TrafficPieChart} />
						<VisualizationCard title="차종별 과속차량" />
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
