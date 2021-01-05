import React from "react";
import { Tabs } from "antd";

import DataVisualization from "../../molecules/dataVisualization/DataVisualization";
import "./style.less";

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

const TimeVisualization = ({ period }) => {
	console.log(period);
	console.log(typeof period);

	return (
		<Tabs defaultActiveKey="1" onChange={callback}>
			<TabPane tab="구간 전체" key="1">
				<DataVisualization period={period} />
			</TabPane>
			<TabPane tab="1 차선" key="2">
				<DataVisualization period={period} />
			</TabPane>
			<TabPane tab="2 차선" key="3">
				<DataVisualization period={period} />
			</TabPane>
			<TabPane tab="3 차선" key="4">
				<DataVisualization period={period} />
			</TabPane>
		</Tabs>
	);
};

export default TimeVisualization;
