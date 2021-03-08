import React, { useState } from "react";
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
		timeClassification,
		activeVisualKey,
		setActiveVisualKey,

		isLoadingTrafficTotal,
		isLoadingOverSpeed,

		trafficTotalData,
		overSpeedData,

		cntTotalData,
		setCntTotalData,

		PCUTotalData,
		setPCUTotalData,

		ratioTotalData,
		setRatioTotalData,

		avgSpeedTotalData,
		setAvgSpeedTotalData,

		overSpeedCntTotalData,
		setOverSpeedCntTotalData,
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
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						trafficTotalData={trafficTotalData}
						totalData={cntTotalData}
						setTotalData={setCntTotalData}
						timeClassification={timeClassification}
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
					// 	timeClassification={timeClassification}
					// />
					<button />
				)}
			</TabPane>
			<TabPane tab="PCU" key="2">
				<PCUBar
					activeVisualKey={activeVisualKey}
					isLoadingTrafficTotal={isLoadingTrafficTotal}
					trafficTotalData={trafficTotalData}
					totalData={PCUTotalData}
					setTotalData={setPCUTotalData}
					timeClassification={timeClassification}
				/>
			</TabPane>
			<TabPane tab="차종비율" key="3">
				<VehicleRatio
					activeVisualKey={activeVisualKey}
					isLoadingTrafficTotal={isLoadingTrafficTotal}
					trafficTotalData={trafficTotalData}
					totalData={ratioTotalData}
					setTotalData={setRatioTotalData}
					timeClassification={timeClassification}
				/>
			</TabPane>
			<TabPane tab="평균속도" key="4">
				<DayAvgSpeedLine
					activeVisualKey={activeVisualKey}
					isLoadingTrafficTotal={isLoadingTrafficTotal}
					trafficTotalData={trafficTotalData}
					totalData={avgSpeedTotalData}
					setTotalData={setAvgSpeedTotalData}
					timeClassification={timeClassification}
				/>
			</TabPane>
			<TabPane tab="과속차량" key="5">
				<DayOverSpeed
					activeVisualKey={activeVisualKey}
					isLoadingOverSpeed={isLoadingOverSpeed}
					overSpeedData={overSpeedData}
					totalData={overSpeedCntTotalData}
					setTotalData={setOverSpeedCntTotalData}
					timeClassification={timeClassification}
				/>
			</TabPane>
		</Tabs>
	);
};

export default LaneDataVisualization;
