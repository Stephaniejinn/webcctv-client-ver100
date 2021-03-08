import React, { useState } from "react";
import { Tabs, Statistic } from "antd";

import DayCntLineChart from "../../charts/lineChart/DTCnt";
import DayPCULineChart from "../../charts/lineChart/DTPCU";
import DayVehicleRatio from "../../charts/lineChart/DTVehicleRatio";
import DayAvgSpeedLine from "../../charts/lineChart/DTAvgSpeed";
import DayOverSpeed from "../../charts/lineChart/DTOverSpeed";
import Peak15 from "../../charts/statisticText/Peak15";
import PeakHour from "../../charts/statisticText/PeakHour";
import PHF from "../../charts/statisticText/PHF";
import SliderBarChart from "../../charts/slideBarChart";
import AreaChart from "../../charts/areaChart";
import PeakRatio from "../../charts/liquidChart/PeakRatio";
import BidirectionalBar from "../../charts/bidirectionalBar/DayNight";
import DashLineChart from "../../charts/dashLineChart/pedestrians";

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

		timeClassification,
		activeVisualKey,
		setActiveVisualKey,

		isLoadingTrafficTotal,
		isLoadingTrafficLane,
		isLoadingOverSpeedTotal,
		isLoadingOverSpeedLane,
		isLoadingPedestrians,
		isLoadingPeak,

		trafficTotalData,
		trafficLaneData,
		overSpeedTotalData,
		overSpeedLaneData,
		peakData,
		pedestriansData,

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
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						isLoadingTrafficLane={isLoadingTrafficLane}
						trafficTotalData={trafficTotalData}
						trafficLaneData={trafficLaneData}
						totalData={cntTotalData}
						setTotalData={setCntTotalData}
						laneData={cntLaneData}
						setLaneData={setCntLaneData}
						timeClassification={timeClassification}
					/>
				) : (
					<WeekCnt
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						isLoadingTrafficLane={isLoadingTrafficLane}
						trafficTotalData={trafficTotalData}
						trafficLaneData={trafficLaneData}
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
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						isLoadingTrafficLane={isLoadingTrafficLane}
						trafficTotalData={trafficTotalData}
						trafficLaneData={trafficLaneData}
						totalData={PCUTotalData}
						setTotalData={setPCUTotalData}
						laneData={PCULaneData}
						setLaneData={setPCULaneData}
						timeClassification={timeClassification}
					/>
				) : (
					<WeekPCU
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						isLoadingTrafficLane={isLoadingTrafficLane}
						trafficTotalData={trafficTotalData}
						trafficLaneData={trafficLaneData}
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
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						isLoadingTrafficLane={isLoadingTrafficLane}
						trafficTotalData={trafficTotalData}
						trafficLaneData={trafficLaneData}
						totalData={ratioTotalData}
						setTotalData={setRatioTotalData}
						laneData={ratioLaneData}
						setLaneData={setRatioLaneData}
					/>
				) : null}
			</TabPane>
			<TabPane tab="평균속도" key="4">
				{period === "DAY" ? (
					<DayAvgSpeedLine
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						isLoadingTrafficLane={isLoadingTrafficLane}
						trafficTotalData={trafficTotalData}
						trafficLaneData={trafficLaneData}
						totalData={avgSpeedTotalData}
						setTotalData={setAvgSpeedTotalData}
						laneData={avgSpeedLaneData}
						setLaneData={setAvgSpeedLaneData}
						timeClassification={timeClassification}
					/>
				) : (
					<WeekAvgSpeed
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingTrafficTotal={isLoadingTrafficTotal}
						isLoadingTrafficLane={isLoadingTrafficLane}
						trafficTotalData={trafficTotalData}
						trafficLaneData={trafficLaneData}
						totalData={avgSpeedTotalData}
						setTotalData={setAvgSpeedTotalData}
						laneData={avgSpeedLaneData}
						setLaneData={setAvgSpeedLaneData}
						timeClassification={timeClassification}
					/>
				)}
			</TabPane>
			<TabPane tab="과속차량" key="5">
				{period === "DAY" ? (
					<DayOverSpeed
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingOverSpeedTotal={isLoadingOverSpeedTotal}
						isLoadingOverSpeedLane={isLoadingOverSpeedLane}
						overSpeedTotalData={overSpeedTotalData}
						overSpeedLaneData={overSpeedLaneData}
						totalData={overSpeedCntTotalData}
						setTotalData={setOverSpeedCntTotalData}
						laneData={overSpeedCntLaneData}
						setLaneData={setOverSpeedCntLaneData}
						timeClassification={timeClassification}
					/>
				) : (
					<WeekOverSpeed
						currentLaneNumber={parseInt(currentLaneNum)}
						totalLaneNumber={totalLaneNumber}
						activeVisualKey={activeVisualKey}
						isLoadingOverSpeedTotal={isLoadingOverSpeedTotal}
						isLoadingOverSpeedLane={isLoadingOverSpeedLane}
						overSpeedTotalData={overSpeedTotalData}
						overSpeedLaneData={overSpeedLaneData}
						totalData={overSpeedCntTotalData}
						setTotalData={setOverSpeedCntTotalData}
						laneData={overSpeedCntLaneData}
						setLaneData={setOverSpeedCntLaneData}
						timeClassification={timeClassification}
					/>
				)}
			</TabPane>

			<TabPane tab="주야율" key="6">
				<BidirectionalBar
					currentLaneNumber={parseInt(currentLaneNum)}
					totalLaneNumber={totalLaneNumber}
					activeVisualKey={activeVisualKey}
					isLoadingTrafficTotal={isLoadingTrafficTotal}
					isLoadingTrafficLane={isLoadingTrafficLane}
					trafficTotalData={trafficTotalData}
					trafficLaneData={trafficLaneData}
					totalData={dayNightTotalData}
					setTotalData={setDayNightTotalData}
					laneData={dayNightLaneData}
					setLaneData={setDayNightLaneData}
					timeClassification={timeClassification}
				/>
			</TabPane>
			<TabPane tab="첨두시간" key="7">
				<Peak15
					currentLaneNumber={parseInt(currentLaneNum)}
					activeVisualKey={activeVisualKey}
					isLoadingPeak={isLoadingPeak}
					peakData={peakData}
					timeClassification={timeClassification}
				/>
			</TabPane>
			<TabPane tab="첨두유율" key="8">
				<PeakHour
					currentLaneNumber={parseInt(currentLaneNum)}
					activeVisualKey={activeVisualKey}
					isLoadingPeak={isLoadingPeak}
					peakData={peakData}
					timeClassification={timeClassification}
				/>
			</TabPane>
			<TabPane tab="PHF" key="9">
				<PHF
					currentLaneNumber={parseInt(currentLaneNum)}
					activeVisualKey={activeVisualKey}
					isLoadingPeak={isLoadingPeak}
					peakData={peakData}
					timeClassification={timeClassification}
				/>
			</TabPane>
			<TabPane tab="집중률" key="10">
				<PeakRatio
					currentLaneNumber={parseInt(currentLaneNum)}
					activeVisualKey={activeVisualKey}
					isLoadingPeak={isLoadingPeak}
					peakData={peakData}
					s
					timeClassification={timeClassification}
				/>
			</TabPane>
			<TabPane tab="무단횡단" key="11">
				<DashLineChart
					currentLaneNumber={parseInt(currentLaneNum)}
					activeVisualKey={activeVisualKey}
					isLoadingPedestrians={isLoadingPedestrians}
					pedestriansData={pedestriansData}
					timeClassification={timeClassification}
				/>
			</TabPane>
		</Tabs>
	);
};

export default TimeDataVisualization;
