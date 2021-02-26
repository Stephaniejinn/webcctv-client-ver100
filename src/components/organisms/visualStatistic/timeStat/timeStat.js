import React, { useState } from "react";
import { Tabs } from "antd";
import TableCard from "../../../molecules/tableCard/TableCard";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

import DataVisualization from "../../../molecules/dataVisualization/DataVisualization";
import "./style.less";

const TimeVisualization = (props) => {
	const { period, startDate, endTime, timeClassification, interval } = props;
	const [isLoading, setLoading] = useState(false);
	// console.log(period);
	// console.log(typeof period);

	const { TabPane } = Tabs;

	function callback(key) {
		// console.log(key);
	}
	return (
		<Tabs defaultActiveKey="1" onChange={callback}>
			<TabPane tab="구간 전체" key="1">
				<DataVisualization
					period={period}
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
					interval={interval}
				/>
				<TableCard
					period={period}
					tableKey="first"
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
					interval="15M"
				/>
				<TableCard
					period={period}
					tableKey="second"
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
					interval="15M"
				/>
				<TableCard
					period={period}
					tableKey="overSpeed"
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
					interval="15M"
				/>
			</TabPane>
			<TabPane tab="1 차선" key="2">
				<DataVisualization period={period} />
			</TabPane>
		</Tabs>
	);
};

export default TimeVisualization;
