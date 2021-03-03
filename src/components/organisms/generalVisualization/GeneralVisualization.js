import React, { useEffect, useState } from "react";
// import { Card } from 'antd';

import Liquid from "../../charts/liquidChart";
import TrafficPie from "../../charts/doughnutChart/traffic";
import PedestriansPie from "../../charts/doughnutChart/pedestrians";

import Gauge from "../../charts/gaugeChart";
import AvgSpeedTinyBar from "../../charts/tinyBarChart/AvgSpeed";
import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";

import "./style.less";

const GeneralVisualization = (props) => {
	const { startDate, endTime, interval, page = "DEFAULT" } = props;

	// const baseURL = "http://119.197.240.186:3002/api/v1";
	// const currentURL = "/statistics/traffic?";
	// const group = timeClassification ? "time" : "lane";
	// const [resData, setResData] = useState([]);

	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			// `${baseURL}${currentURL}groupBy=${group}&camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime}&interval=${interval}`,
	// 			`${baseURL}${currentURL}groupBy=${group}&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59&interval=15M&limit=0&offset=0`,
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 					Cache: "No-cache",
	// 				},
	// 			}
	// 		)
	// 		.then((res) => {
	// 			console.log(res.data);
	// 			setResData(res.data);
	// 			// res.data.forEach((TrafficData) => {});
	// 			// console.log(vehicleRatioData);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// }, []);

	const TrafficPieChart = (
		<TrafficPie
			startDate={startDate}
			endTime={endTime}
			interval={interval}
			// resData={resData}
		/>
	);
	const PedestriansPieChart = (
		<PedestriansPie
			startDate={startDate}
			endTime={endTime}
			interval={interval}
			// resData={resData}
		/>
	);
	const GaugeChart = (
		<Gauge
			startDate={startDate}
			endTime={endTime}
			interval={interval}
			// resData={resData}
		/>
	);
	var AvgSpeedTinyBarChart = (
		<AvgSpeedTinyBar
			startDate={startDate}
			endTime={endTime}
			interval={interval}
		/>
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
export default GeneralVisualization;
