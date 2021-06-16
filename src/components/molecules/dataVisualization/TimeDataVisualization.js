import React, { useEffect } from "react";
import { Tabs, Typography } from "antd";

import GraphCard from "../graphCard/GraphCard";
import DayCntLineChart from "../../charts/lineChart/DTCnt";
import DayPCULineChart from "../../charts/lineChart/DTPCU";
import DayVehicleRatio from "../../charts/lineChart/DTVehicleRatio";
import DayAvgSpeed from "../../charts/lineChart/DTAvgSpeed";
import DayOverSpeed from "../../charts/lineChart/DTOverSpeed";
import Peak15 from "../../charts/statisticText/Peak15";
import PeakHourFlowRate from "../../charts/statisticText/PeakHourFlowRate";
import DayPHF from "../../charts/statisticText/PHF";
import DayConcentrationRatio from "../../charts/liquidChart/PeakRatio";
import BidirectionalBar from "../../charts/bidirectionalBar/DayNight";

import WeekCnt from "../../charts/lineChart/WTCnt";
import WeekPCU from "../../charts/lineChart/WTPCU";
import WeekAvgSpeed from "../../charts/lineChart/WTAvgSpeed";
import WeekOverSpeed from "../../charts/lineChart/WTOverSpeed";
import WeekVehicleRatio from "../../charts/barChart/WTVehicleRatio";
import WeekPeakTime from "../../charts/lineChart/WeekPeakTime";

import WeekMonthFlowRate from "../../charts/barChart/WMFlowRate";
import WeekMonthPHF from "../../charts/barChart/WTPHF";
import WeekMonthConcentrationRatio from "../../charts/barChart/WTConcentrationRatio";

import MonthCnt from "../../charts/lineChart/MTCnt";
import MonthPCU from "../../charts/lineChart/MTPCU";
import MonthVehicleRatio from "../../charts/lineChart/MTVehicleRatio";
import MonthAvgSpeed from "../../charts/lineChart/MTAvgSpeed";
import MonthOverSpeed from "../../charts/lineChart/MTOverSpeed";
import MonthPeakTime from "../../charts/lineChart/MonthPeakTime";

import "./style.less";

const TimeDataVisualization = (props) => {
	const {
		period,
		currentLaneNum,
		activeVisualKey,
		setActiveVisualKey,
		trafficTotalData,
	} = props;

	const { TabPane } = Tabs;
	const { Title, Text } = Typography;

	const callback = (key) => {
		setActiveVisualKey(key);
	};
	useEffect(() => {
		if (parseInt(currentLaneNum) !== 0) {
			if (
				activeVisualKey === "6" ||
				activeVisualKey === "7" ||
				activeVisualKey === "8" ||
				activeVisualKey === "9" ||
				activeVisualKey === "10"
			) {
				setActiveVisualKey("1");
			}
		}
	}, [currentLaneNum]);
	return (
		<Tabs
			defaultActiveKey="1"
			activeKey={activeVisualKey}
			onChange={callback}
			tabPosition="right"
		>
			<TabPane tab="교통량" key="1">
				{period === "DAY" ? (
					// <div className="chart-vertical">
					// 	<div className="chart-horizontal">
					// 		<Text
					// 			strong
					// 			style={{ verticalAlign: "middle", marginRight: "5px" }}
					// 		>
					// 			대수
					// 		</Text>
					// <DayCntLineChart
					// 	activeVisualKey={activeVisualKey}
					// 	trafficTotalData={trafficTotalData}
					// />
					// 	</div>
					// 	<Text strong>시간</Text>
					// </div>
					<GraphCard
						xAxis="시간"
						yAxis="대수"
						Graph={
							<DayCntLineChart
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : period === "WEEK" ? (
					<GraphCard
						xAxis="요일"
						yAxis="대수"
						Graph={
							<WeekCnt
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : (
					<GraphCard
						xAxis="일"
						yAxis="대수"
						Graph={
							<MonthCnt
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				)}
			</TabPane>
			<TabPane tab="PCU" key="2">
				{period === "DAY" ? (
					<GraphCard
						xAxis="시간"
						yAxis="대수"
						Graph={
							<DayPCULineChart
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : period === "WEEK" ? (
					<GraphCard
						xAxis="요일"
						yAxis="대수"
						Graph={
							<WeekPCU
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : (
					<GraphCard
						xAxis="일"
						yAxis="대수"
						Graph={
							<MonthPCU
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				)}
			</TabPane>
			<TabPane tab="차종비율" key="3">
				{period === "DAY" ? (
					<GraphCard
						xAxis="시간"
						yAxis="비율"
						Graph={
							<DayVehicleRatio
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : period === "WEEK" ? (
					<GraphCard
						xAxis="요일"
						yAxis="비율"
						Graph={
							<WeekVehicleRatio
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : (
					<GraphCard
						xAxis="일"
						yAxis="비율"
						Graph={
							<MonthVehicleRatio
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				)}
			</TabPane>
			<TabPane tab="평균속도" key="4">
				{period === "DAY" ? (
					<GraphCard
						xAxis="시간"
						yAxis="속도"
						Graph={
							<DayAvgSpeed
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : period === "WEEK" ? (
					<GraphCard
						xAxis="요일"
						yAxis="속도"
						Graph={
							<WeekAvgSpeed
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : (
					<GraphCard
						xAxis="일"
						yAxis="속도"
						Graph={
							<MonthAvgSpeed
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				)}
			</TabPane>
			<TabPane tab="과속차량" key="5">
				{period === "DAY" ? (
					<GraphCard
						xAxis="시간"
						yAxis="대수"
						Graph={
							<DayOverSpeed
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : period === "WEEK" ? (
					<GraphCard
						xAxis="요일"
						yAxis="대수"
						Graph={
							<WeekOverSpeed
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				) : (
					<GraphCard
						xAxis="일"
						yAxis="대수"
						Graph={
							<MonthOverSpeed
								activeVisualKey={activeVisualKey}
								trafficTotalData={trafficTotalData}
							/>
						}
					/>
				)}
			</TabPane>
			{parseInt(currentLaneNum) === 0 ? (
				<>
					<TabPane tab="주야율" key="6">
						<GraphCard
							xAxis="대수"
							yAxis="차종"
							Graph={
								<BidirectionalBar
									activeVisualKey={activeVisualKey}
									trafficTotalData={trafficTotalData}
								/>
							}
						/>
					</TabPane>
					<TabPane tab="첨두시간" key="7">
						{period === "DAY" ? (
							<Peak15
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : period === "WEEK" ? (
							<GraphCard
								xAxis="요일"
								yAxis="시간"
								Graph={
									<WeekPeakTime
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						) : (
							<GraphCard
								xAxis="일"
								yAxis="시간"
								Graph={
									<MonthPeakTime
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						)}
					</TabPane>
					<TabPane tab="첨두유율" key="8">
						{period === "DAY" ? (
							<PeakHourFlowRate
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : period === "DAY" ? (
							<GraphCard
								xAxis="요일"
								yAxis="대수"
								Graph={
									<WeekMonthFlowRate
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						) : period === "WEEK" ? (
							<GraphCard
								xAxis="요일"
								yAxis="대수"
								Graph={
									<WeekMonthFlowRate
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						) : (
							<GraphCard
								xAxis="일"
								yAxis="대수"
								Graph={
									<WeekMonthFlowRate
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						)}
					</TabPane>
					<TabPane tab="PHF" key="9">
						{period === "DAY" ? (
							<DayPHF
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : period === "WEEK" ? (
							<GraphCard
								xAxis="요일"
								yAxis="첨두시간계수"
								Graph={
									<WeekMonthPHF
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						) : (
							<GraphCard
								xAxis="일"
								yAxis="첨두시간계수"
								Graph={
									<WeekMonthPHF
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						)}
					</TabPane>
					<TabPane tab="집중률" key="10">
						{period === "DAY" ? (
							<DayConcentrationRatio
								trafficTotalData={trafficTotalData}
								activeVisualKey={activeVisualKey}
							/>
						) : period === "WEEK" ? (
							<GraphCard
								xAxis="요일"
								yAxis="비율"
								Graph={
									<WeekMonthConcentrationRatio
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						) : (
							<GraphCard
								xAxis="일"
								yAxis="비율"
								Graph={
									<WeekMonthConcentrationRatio
										trafficTotalData={trafficTotalData}
										activeVisualKey={activeVisualKey}
									/>
								}
							/>
						)}
					</TabPane>
				</>
			) : null}
		</Tabs>
	);
};

export default TimeDataVisualization;
