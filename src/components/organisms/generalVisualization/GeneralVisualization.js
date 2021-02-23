import React, { useEffect, useState } from "react";
// import { Card } from 'antd';
import axios from "axios";

import Liquid from "../../charts/liquidChart";
import DoughnutPie from "../../charts/doughnutChart";
import Gauge from "../../charts/gaugeChart";
import TinyBar from "../../charts/tinyBarChart";
import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";

import "./style.less";

const GeneralVisualization = (props) => {
	const {
		startDate,
		endTime,
		timeClassification,
		interval,
		page = "DEFAULT",
	} = props;

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

	const LiquidChart = <Liquid />;
	const PieChart = (
		<DoughnutPie
			startDate={startDate}
			endTime={endTime}
			timeClassification={timeClassification}
			interval={interval}
			// resData={resData}
		/>
	);
	const GaugeChart = (
		<Gauge
			startDate={startDate}
			endTime={endTime}
			timeClassification={timeClassification}
			interval={interval}
			// resData={resData}
		/>
	);
	var TinyBarChart = (
		<TinyBar
			startDate={startDate}
			endTime={endTime}
			timeClassification={timeClassification}
			interval={interval}
		/>
	);
	return (
		<div className="general-graph-layout">
			{page === "STREAMING" ? (
				<div className="general-graph-card">
					<VisualizationCard title="혼잡도" chart={LiquidChart} />
					<VisualizationCard title="차종별 통행량" chart={PieChart} />
					<VisualizationCard title="평균속도" chart={GaugeChart} />
				</div>
			) : (
				<>
					<div className="general-graph-card">
						<VisualizationCard title="혼잡도" chart={LiquidChart} />
						<VisualizationCard title="차종별 통행량" chart={PieChart} />
						<VisualizationCard title="평균속도" chart={GaugeChart} />
					</div>
					<div className="general-graph-card">
						<VisualizationCard title="차종별 평균속도" chart={TinyBarChart} />
						<VisualizationCard title="무단횡단" chart={PieChart} />
						<VisualizationCard title="차종별 과속차량" chart={TinyBarChart} />
					</div>
				</>
			)}
		</div>
	);
};
export default GeneralVisualization;
