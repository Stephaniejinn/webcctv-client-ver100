import React, { useEffect, useState } from "react";
import { Spin } from "antd";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";
import VehicleRatio from "../../charts/doughnutChart/VehicleRatio";
import AvgSpeedGauge from "../../charts/gaugeChart/AvgSpeed";
import AvgSpeedTinyBar from "../../charts/tinyBarChart/AvgSpeed";
import OverSpeedTinyBar from "../../charts/tinyBarChart/overSpeed";

import "./style.less";

const GeneralVisualization = (props) => {
	const {
		period,
		startDate,
		endTime,
		currentTime,
		cameraCode,
		baseURL,
		trafficURL,
	} = props;

	const [isLoadingTraffic, setLoadingTraffic] = useState(true);
	const [trafficData, setTrafficData] = useState([]);

	// var camCode = cameraCode.length === 0 ? "0001" : cameraCode;
	var camCode = cameraCode.length === 0 ? "0004" : cameraCode;

	var curTime = currentTime ? currentTime : "23:59:59";
	const periodURL =
		period === "DAY" ? "/daily" : period === "WEEK" ? "/Weekly" : "/Monthly";

	useEffect(() => {
		getTrafficData();
	}, [camCode, startDate, endTime]);

	const getTrafficData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}${periodURL}?&camCode=${camCode}&startDate=${startDate}&endTime=${endTime} ${curTime}&axis=time&laneNumber=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setTrafficData(res.data);
				if (res.data.length !== 0) {
					setLoadingTraffic(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	var TrafficPieChart = <VehicleRatio trafficData={trafficData} />;
	var GaugeChart = <AvgSpeedGauge trafficData={trafficData} />;
	var AvgSpeedTinyBarChart = <AvgSpeedTinyBar trafficData={trafficData} />;
	var OverSpeedTinyBarChart = <OverSpeedTinyBar trafficData={trafficData} />;

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
)(GeneralVisualization);
