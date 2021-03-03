import React, { useState } from "react";
import { Tabs, Statistic } from "antd";

import CntLineChart from "../../charts/lineChart/Cnt";
import OverSpeedLine from "../../charts/lineChart/OverSpeed";
import SliderBarChart from "../../charts/slideBarChart";
import AreaChart from "../../charts/areaChart";
import LiquidChart from "../../charts/liquidChart";
import BidirectionalBar from "../../charts/bidirectionalBar";
import DashLineChart from "../../charts/dashLineChart";

import "./style.less";

const DataVisualization = (props) => {
	const {
		period,
		currentLaneNum,
		totalLaneNumber,
		setCurrentLaneNum,
		startDate,
		endTime,
		timeClassification,
		interval,
		activeVisualKey,
		setActiveVisualKey,
		isLoadingCntData,
		setLoadingCntData,
		cntTotalData,
		setCntTotalData,
		cntLaneData,
		setCntLaneData,
		isLoadingOverSpeedData,
		setLoadingOverSpeedData,
		overSpeedTotalData,
		setOverSpeedTotalData,
		overSpeedLaneData,
		setOverSpeedLaneData,
	} = props;
	const { TabPane } = Tabs;

	const callback = (key) => {
		setActiveVisualKey(key);
		if (key !== "1") {
			setCurrentLaneNum("0");
		}
		console.log(key);
	};
	// console.log(period);
	// if ()
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
						isLoadingData={isLoadingCntData}
						setLoadingData={setLoadingCntData}
						totalData={cntTotalData}
						setTotalData={setCntTotalData}
						laneData={cntLaneData}
						setLaneData={setCntLaneData}
						startDate={startDate}
						endTime={endTime}
						timeClassification={timeClassification}
						interval={interval}
					/>
				) : (
					<button />
				)}
			</TabPane>
			<TabPane tab="PCU" key="2">
				{/* <OverSpeedLine
					currentLaneNum={parseInt(currentLaneNum)}
					totalLaneNumber={totalLaneNumber}
					isLoadingData={isLoadingOverSpeedData}
					setLoadingData={setLoadingOverSpeedData}
					totalData={overSpeedTotalData}
					setTotalData={setOverSpeedTotalData}
					laneData={overSpeedLaneData}
					setLaneData={setOverSpeedLaneData}
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
					interval={interval}
				/> */}
			</TabPane>
			<TabPane tab="차종비율" key="3">
				<SliderBarChart />
			</TabPane>
			<TabPane tab="평균속도" key="4">
				<OverSpeedLine
					currentLaneNumber={parseInt(currentLaneNum)}
					totalLaneNumber={totalLaneNumber}
					isLoadingData={isLoadingOverSpeedData}
					setLoadingData={setLoadingOverSpeedData}
					totalData={overSpeedTotalData}
					setTotalData={setOverSpeedTotalData}
					laneData={overSpeedLaneData}
					setLaneData={setOverSpeedLaneData}
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
					interval={interval}
				/>
			</TabPane>
			<TabPane tab="과속차량" key="5">
				<CntLineChart />
			</TabPane>

			<TabPane tab="주야율" key="6">
				<BidirectionalBar />
			</TabPane>
			<TabPane tab="첨두시간" key="7">
				<AreaChart />
			</TabPane>
			<TabPane tab="첨두유율" key="8">
				<LiquidChart />
			</TabPane>
			<TabPane tab="PHF" key="9">
				<Statistic title="PHF" value={112893} />
			</TabPane>
			<TabPane tab="집중률" key="10">
				Content of Tab Pane 3
			</TabPane>
			<TabPane tab="무단횡단" key="11">
				<DashLineChart
					lane={currentLaneNum}
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
					interval={interval}
				/>
			</TabPane>
		</Tabs>
	);
};

export default DataVisualization;
