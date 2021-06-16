import React from "react";
import { Tabs, Typography } from "antd";

import GraphCard from "../graphCard/GraphCard";

import VehicleVolume from "../../charts/barChart/LaneVehicleCnt";
import PCUBar from "../../charts/barChart/LanePCU";
import VehicleRatio from "../../charts/barChart/LaneVehicleRatio";
import AvgSpeed from "../../charts/lineChart/LaneAvgSpeed";
import OverSpeedVolume from "../../charts/barChart/LaneOverSpeedCnt";
import NotificationButton from "../../atoms/notificationButton/NotificationButton";

import "./style.less";

const LaneDataVisualization = (props) => {
	const { activeVisualKey, setActiveVisualKey, trafficTotalData } = props;

	const { TabPane } = Tabs;
	const { Paragraph, Text } = Typography;

	const descriptionText = (
		<>
			<Paragraph>
				선택된 구간의 차선 별 교통 정보가 그래프로 표시됩니다.
			</Paragraph>
			<Paragraph>표시정보:</Paragraph>
			<Paragraph>
				<ul>
					<li>
						<Text>교통량</Text>
					</li>
					<li>
						<Text>PCU</Text>
					</li>
					<li>
						<Text>차종비율</Text>
					</li>
					<li>
						<Text>평균속도</Text>
					</li>
					<li>
						<Text>과속차량 수</Text>
					</li>
				</ul>
				<Paragraph>*항목별 상세사항은 매뉴얼에 기재 됨</Paragraph>
			</Paragraph>
		</>
	);
	const callback = (key) => {
		setActiveVisualKey(key);
	};

	return (
		<Tabs
			defaultActiveKey="1"
			activeKey={activeVisualKey}
			onChange={callback}
			tabPosition="right"
			tabBarExtraContent={{
				left: <NotificationButton description={descriptionText} />,
			}}
		>
			<TabPane tab="교통량" key="1">
				<GraphCard
					xAxis="차선"
					yAxis="대수"
					Graph={
						<VehicleVolume
							activeVisualKey={activeVisualKey}
							trafficTotalData={trafficTotalData}
						/>
					}
				/>
			</TabPane>
			<TabPane tab="PCU" key="2">
				<GraphCard
					xAxis="차선"
					yAxis="대수"
					Graph={
						<PCUBar
							activeVisualKey={activeVisualKey}
							trafficTotalData={trafficTotalData}
						/>
					}
				/>
			</TabPane>
			<TabPane tab="차종비율" key="3">
				<GraphCard
					xAxis="차선"
					yAxis="비율"
					Graph={
						<VehicleRatio
							activeVisualKey={activeVisualKey}
							trafficTotalData={trafficTotalData}
						/>
					}
				/>
			</TabPane>
			<TabPane tab="평균속도" key="4">
				<GraphCard
					xAxis="차선"
					yAxis="속도"
					Graph={
						<AvgSpeed
							activeVisualKey={activeVisualKey}
							trafficTotalData={trafficTotalData}
						/>
					}
				/>
			</TabPane>
			<TabPane tab="과속차량" key="5">
				<GraphCard
					xAxis="차선"
					yAxis="대수"
					Graph={
						<OverSpeedVolume
							activeVisualKey={activeVisualKey}
							trafficTotalData={trafficTotalData}
						/>
					}
				/>
			</TabPane>
		</Tabs>
	);
};

export default LaneDataVisualization;
