import React, { useState } from "react";
import { Tabs, Statistic } from "antd";

import CntLineChart from "../../charts/lineChart/Cnt";
import PCULineChart from "../../charts/lineChart/PCU";
import AvgSpeedLine from "../../charts/lineChart/AvgSpeed";
import Peak15 from "../../charts/statisticText/Peak15";
import PeakHour from "../../charts/statisticText/PeakHour";
import PHF from "../../charts/statisticText/PHF";
import SliderBarChart from "../../charts/slideBarChart";
import AreaChart from "../../charts/areaChart";
import PeakRatio from "../../charts/liquidChart/PeakRatio";
import BidirectionalBar from "../../charts/bidirectionalBar/DayNight";
import DashLineChart from "../../charts/dashLineChart/pedestrians";

import "./style.less";

const DataVisualization = (props) => {
	const {
		period,
		currentLaneNum,
		totalLaneNumber,
		startDate,
		endTime,
		timeClassification,
		interval,
		activeVisualKey,
		setActiveVisualKey,

		isLoadingTrafficTotal,
		isLoadingTrafficLane,
		isLoadingPedestrians,
		isLoadingPeak,

		trafficTotalData,
		trafficLaneData,
		trafficHData,
		overSpeedData,
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

		avgSpeedTotalData,
		setAvgSpeedTotalData,
		avgSpeedLaneData,
		setAvgSpeedLaneData,

		dayNightTotalData,
		setDayNightTotalData,
		dayNightLaneData,
		setDayNightLaneData,

		// overSpeedTotalData,
		// setOverSpeedTotalData,
		// overSpeedLaneData,
		// setOverSpeedLaneData,
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
					<CntLineChart
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
					<button />
				)}
			</TabPane>
			<TabPane tab="PCU" key="2">
				<PCULineChart
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
			</TabPane>
			<TabPane tab="차종비율" key="3">
				<SliderBarChart />
			</TabPane>
			<TabPane tab="평균속도" key="4">
				<AvgSpeedLine
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
			</TabPane>
			<TabPane tab="과속차량" key="5">
				<CntLineChart />
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

export default DataVisualization;
