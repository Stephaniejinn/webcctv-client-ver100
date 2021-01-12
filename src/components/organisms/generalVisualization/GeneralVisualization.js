import React from "react";
// import { Card } from 'antd';
import Liquid from "../../atoms/liquidChart/LiquidChart";
import Pie from "../../atoms/pieChart/PieChart";
import Gauge from "../../atoms/gaugeChart/GaugeChart";
import TinyBar from "../../atoms/tinyBarChart/TinyBarChart";
import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";

import "./style.less";

const GeneralGraph = ({ page = "DEFAULT" }) => {
	const LiquidChart = <Liquid />;
	const PieChart = <Pie />;
	const GaugeChart = <Gauge />;
	const TinyBarChart = <TinyBar />;
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
export default GeneralGraph;
