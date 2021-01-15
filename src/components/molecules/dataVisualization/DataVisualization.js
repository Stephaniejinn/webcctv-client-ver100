import React from "react";
import { Tabs } from "antd";
import LineChart from "../../atoms/lineChart/LineChart";
import SliderBarChart from "../../atoms/slideBarChart/SliderBarChart";
import AreaChart from "../../atoms/areaChart/AreaChart";
import LiquidChart from "../../atoms/liquidChart/LiquidChart";
import BidirectionalBar from "../../atoms/bidirectionalBar/BidirectionalBar";
import DashLineChart from "../../atoms/dashLineChart/DashLineChart";

import "./style.less";

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

const DataVisualization = ({ period }) => {
	console.log(period);
	return (
		<Tabs defaultActiveKey="1" onChange={callback} tabPosition="right">
			<TabPane tab="교통량" key="1">
				{period === "DAY" ? <LineChart /> : <button />}
			</TabPane>
			<TabPane tab="PCU" key="2">
				<LineChart />
			</TabPane>
			<TabPane tab="차종비율" key="3">
				<SliderBarChart />
			</TabPane>
			<TabPane tab="평균속도" key="4">
				<LineChart />
			</TabPane>
			<TabPane tab="과속차량" key="5">
				<LineChart />
			</TabPane>
			<TabPane tab="PHF" key="6">
				Content of Tab Pane 2
			</TabPane>
			<TabPane tab="주야율" key="7">
				<BidirectionalBar />
			</TabPane>
			<TabPane tab="집중율" key="8">
				Content of Tab Pane 3
			</TabPane>
			<TabPane tab="첨두시간" key="9">
				<AreaChart />
			</TabPane>
			<TabPane tab="첨두유율" key="10">
				<LiquidChart />
			</TabPane>
			<TabPane tab="무단횡단" key="11">
				<DashLineChart />
			</TabPane>
		</Tabs>
	);
};

export default DataVisualization;
