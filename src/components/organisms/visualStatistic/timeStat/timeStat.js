import React, { useState, useEffect } from "react";
import { Tabs, message, Typography } from "antd";
import axios from "axios";
import { connect } from "react-redux";

import TimeTableCard from "../../../molecules/tableCard/TimeTableCard";
import TimeDataVisualization from "../../../molecules/dataVisualization/TimeDataVisualization";
import NotificationButton from "../../../atoms/notificationButton/NotificationButton";

import "../style.less";

const TimeVisualization = (props) => {
	const {
		period,
		startDate,
		endTime,
		cameraCode,
		camLanes,
		baseURL,
		trafficURL,
		setLoggedIn,
		setEmptyErr,
		setFutureErr,
	} = props;
	const { TabPane } = Tabs;
	const { Paragraph, Text } = Typography;

	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);
	const [isEmptyData, setEmptyData] = useState(false);

	const [totalLaneArr, setTotalLaneArr] = useState([]);
	const [currentLaneNum, setCurrentLaneNum] = useState("0");
	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [trafficTotalData, setTrafficTotalData] = useState([]);
	const descriptionText = (
		<>
			<Paragraph>
				{period === "DAY" ? "일" : period === "WEEK" ? "주" : "월"}간 누적 통계
				해당 구간에 대한 시간 별 정보가 그래프로 표시됩니다
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
					<li>
						<Text>주야율</Text>
					</li>
					<li>
						<Text>첨두시간</Text>
					</li>
					<li>
						<Text>첨두유욜</Text>
					</li>
					<li>
						<Text>PHF(첨두시간계수)</Text>
					</li>
					<li>
						<Text>집중율</Text>
					</li>
				</ul>
				<Paragraph>*항목별 상세사항은 매뉴얼에 기재 됨</Paragraph>
			</Paragraph>
		</>
	);
	const periodURL =
		period === "DAY" ? "/daily" : period === "WEEK" ? "/weekly" : "/monthly";

	const currentURL =
		period === "DAY"
			? `${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=time&laneNumber=${currentLaneNum}`
			: `${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=time&laneNumber=${currentLaneNum}&weekOption=ALL`;

	useEffect(() => {
		var tabLaneNum = ["구간 전체"];
		for (let idx = 1; idx <= camLanes; idx++) {
			tabLaneNum.push(`${idx} 차선`);
		}
		setTotalLaneArr(tabLaneNum);
	}, [camLanes]);

	useEffect(() => {
		setTrafficTotalData([]);
		setLoadingTrafficTotal(true);
		axiosAsync();
	}, [cameraCode, startDate, endTime, currentLaneNum]);

	const axiosAsync = () => {
		axios
			.get(`${currentURL}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				if (res.data.length !== 0) {
					setTrafficTotalData(res.data);
					setLoadingTrafficTotal(false);
					setEmptyData(false);
					setEmptyErr(false);
					setFutureErr(false);
				} else {
					setEmptyData(true);
					if (setEmptyErr) {
						setEmptyErr(true);
						setFutureErr(false);
					}
					message.warning("해당 기간 데이터가 없습니다");
				}
			})
			.catch((err) => {
				if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				} else if (err.response.status === 400) {
					message.warning("분석이 완료되지 않은 기간에 대한 검색입니다");
					if (setFutureErr) {
						setEmptyErr(false);
						setFutureErr(true);
					}
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
				setEmptyData(true);
			});
	};

	function callback(key) {
		setCurrentLaneNum(key);
	}
	return (
		<>
			{!isLoadingTrafficTotal ? (
				<>
					<Tabs
						defaultActiveKey="0"
						activeKey={currentLaneNum}
						onChange={callback}
						tabBarExtraContent={
							<NotificationButton description={descriptionText} />
						}
					>
						{totalLaneArr.map((tabName, index) => {
							return (
								<TabPane tab={tabName} key={index.toString()}>
									<TimeDataVisualization
										period={period}
										currentLaneNum={currentLaneNum}
										setCurrentLaneNum={setCurrentLaneNum}
										activeVisualKey={activeVisualKey}
										setActiveVisualKey={setActiveVisualKey}
										trafficTotalData={trafficTotalData}
									/>
									<TimeTableCard
										period={period}
										tableKey="first"
										currentLaneNum={currentLaneNum}
										trafficTotalData={trafficTotalData}
										startDate={startDate}
										endTime={endTime}
									/>
									<TimeTableCard
										period={period}
										tableKey="second"
										currentLaneNum={currentLaneNum}
										trafficTotalData={trafficTotalData}
										startDate={startDate}
										endTime={endTime}
									/>
								</TabPane>
							);
						})}
					</Tabs>
				</>
			) : null}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		camLanes: state.locationCode.camLanes,
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
	};
};

export default connect(mapStateToProps)(TimeVisualization);
