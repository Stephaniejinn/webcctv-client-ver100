import React, { useState } from "react";
import { Tabs, Spin } from "antd";
import DayCntLineChart from "../../charts/lineChart/DTCnt";
import DayPCULineChart from "../../charts/lineChart/DTPCU";
import DayVehicleRatio from "../../charts/lineChart/DTVehicleRatio";
import DayAvgSpeed from "../../charts/lineChart/DTAvgSpeed";
import DayOverSpeed from "../../charts/lineChart/DTOverSpeed";
import Peak15 from "../../charts/statisticText/Peak15";
import PeakHour from "../../charts/statisticText/PeakHour";
import PHF from "../../charts/statisticText/PHF";
import PeakRatio from "../../charts/liquidChart/PeakRatio";
import BidirectionalBar from "../../charts/bidirectionalBar/DayNight";
import PedestriansDashLine from "../../charts/dashLineChart/pedestrians";

import WeekCnt from "../../charts/lineChart/WTCnt";
import WeekPCU from "../../charts/lineChart/WTPCU";
import WeekAvgSpeed from "../../charts/lineChart/WTAvgSpeed";
import WeekOverSpeed from "../../charts/lineChart/WTOverSpeed";

import "./style.less";

const TimeDataVisualization = (props) => {
	const {
		period,
		currentLaneNum,
		totalLaneNumber,

		activeVisualKey,
		setActiveVisualKey,

		isLoadingTrafficTotal,
		trafficTotalData,

		cntTotalData,
		setCntTotalData,
		cntLaneData,
		setCntLaneData,

		PCUTotalData,
		setPCUTotalData,
		PCULaneData,
		setPCULaneData,

		ratioTotalData,
		setRatioTotalData,
		ratioLaneData,
		setRatioLaneData,

		avgSpeedTotalData,
		setAvgSpeedTotalData,
		avgSpeedLaneData,
		setAvgSpeedLaneData,

		dayNightTotalData,
		setDayNightTotalData,
		dayNightLaneData,
		setDayNightLaneData,

		overSpeedCntTotalData,
		setOverSpeedCntTotalData,
		overSpeedCntLaneData,
		setOverSpeedCntLaneData,
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
					<DayCntLineChart
						currentLaneNumber={parseInt(currentLaneNum)}
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<WeekCnt
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						trafficTotalData={trafficTotalData}
						totalData={cntTotalData}
						setTotalData={setCntTotalData}
						laneData={cntLaneData}
						setLaneData={setCntLaneData}
					/>
				)}
			</TabPane>
			<TabPane tab="PCU" key="2">
				{period === "DAY" ? (
					<DayPCULineChart
						currentLaneNumber={parseInt(currentLaneNum)}
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<WeekPCU
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						trafficTotalData={trafficTotalData}
						totalData={PCUTotalData}
						setTotalData={setPCUTotalData}
						laneData={PCULaneData}
						setLaneData={setPCULaneData}
					/>
				)}
			</TabPane>
			<TabPane tab="차종비율" key="3">
				{period === "DAY" ? (
					<DayVehicleRatio
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : null}
			</TabPane>
			<TabPane tab="평균속도" key="4">
				{period === "DAY" ? (
					<DayAvgSpeed
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<WeekAvgSpeed
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						trafficTotalData={trafficTotalData}
						totalData={avgSpeedTotalData}
						setTotalData={setAvgSpeedTotalData}
						laneData={avgSpeedLaneData}
						setLaneData={setAvgSpeedLaneData}
					/>
				)}
			</TabPane>
			<TabPane tab="과속차량" key="5">
				{period === "DAY" ? (
					<DayOverSpeed
						activeVisualKey={activeVisualKey}
						trafficTotalData={trafficTotalData}
					/>
				) : (
					<WeekOverSpeed
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						totalData={overSpeedCntTotalData}
						setTotalData={setOverSpeedCntTotalData}
						laneData={overSpeedCntLaneData}
						setLaneData={setOverSpeedCntLaneData}
					/>
				)}
			</TabPane>
			{parseInt(currentLaneNum) === 0 && (
				<>
					<TabPane tab="주야율" key="6">
						<BidirectionalBar
							activeVisualKey={activeVisualKey}
							trafficTotalData={trafficTotalData}
						/>
					</TabPane>
					<TabPane tab="첨두시간" key="7">
						<Peak15
							trafficTotalData={trafficTotalData}
							activeVisualKey={activeVisualKey}
						/>
					</TabPane>
					<TabPane tab="첨두유율" key="8">
						<PeakHour
							trafficTotalData={trafficTotalData}
							activeVisualKey={activeVisualKey}
						/>
					</TabPane>
					<TabPane tab="PHF" key="9">
						<PHF
							trafficTotalData={trafficTotalData}
							activeVisualKey={activeVisualKey}
						/>
					</TabPane>
					<TabPane tab="집중률" key="10">
						<PeakRatio
							trafficTotalData={trafficTotalData}
							activeVisualKey={activeVisualKey}
						/>
					</TabPane>
					<TabPane tab="무단횡단" key="11">
						<PedestriansDashLine
							activeVisualKey={activeVisualKey}
							trafficTotalData={trafficTotalData}
						/>
					</TabPane>
				</>
			)}
		</Tabs>
	);
};

export default TimeDataVisualization;
