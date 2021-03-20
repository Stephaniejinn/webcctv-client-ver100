import React from "react";
import { Tabs } from "antd";

import DayCnt from "../../charts/barChart/DLCnt";
import PCUBar from "../../charts/barChart/DLPCU";
import VehicleRatio from "../../charts/barChart/DLVehicleRatio";
import DayAvgSpeedLine from "../../charts/lineChart/DLAvgSpeed";
import DayOverSpeed from "../../charts/barChart/DLOverSpeed";

import "./style.less";

const LaneDataVisualization = (props) => {
	const {
		period,
		activeVisualKey,
		setActiveVisualKey,
		trafficTotalData,
	} = props;

	const { TabPane } = Tabs;

	const callback = (key) => {
		setActiveVisualKey(key);
	};

	return (
		<Tabs
			defaultActiveKey="1"
			activeKey={activeVisualKey}
			onChange={callback}
			tabPosition="right"
		>
			<TabPane tab="교통량" key="1">
				{period === "DAY" ? (
					<DayCnt
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					// <CntLineChart
					// 	currentLaneNumber={parseInt(currentLaneNum)}
					// 	totalLaneNumber={totalLaneNumber}
					// 	activeVisualKey={activeVisualKey}
					// 	isLoadingTrafficTotal={isLoadingTrafficTotal}
					// 	isLoadingTrafficLane={isLoadingTrafficLane}
					// 	trafficTotalData={trafficTotalData}
					// 	trafficLaneData={trafficLaneData}
					// 	totalData={cntTotalData}
					// 	setTotalData={setCntTotalData}
					// 	laneData={cntLaneData}
					// 	setLaneData={setCntLaneData}
					// />
					<button />
				)}
			</TabPane>
			<TabPane tab="PCU" key="2">
				<PCUBar
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
			<TabPane tab="차종비율" key="3">
				<VehicleRatio
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
			<TabPane tab="평균속도" key="4">
				<DayAvgSpeedLine
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
			<TabPane tab="과속차량" key="5">
				<DayOverSpeed
					activeVisualKey={activeVisualKey}
					trafficTotalData={trafficTotalData}
				/>
			</TabPane>
		</Tabs>
	);
};

export default LaneDataVisualization;
