import React, { useEffect, useState } from "react";
import { Spin, message, Typography } from "antd";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";

import VisualizationCard from "../../molecules/genVisualizationCard/GenVisualizationCard";
import VehicleRatio from "../../charts/doughnutChart/VehicleRatio";
import AvgSpeedGauge from "../../charts/gaugeChart/AvgSpeed";
import AvgSpeedBar from "../../charts/barChart/GenAvgSpeed";
import OverSpeedBar from "../../charts/barChart/GenOverSpeed";

import NotificationButton from "../../atoms/notificationButton/NotificationButton";
import "./style.less";

const GeneralVisualization = (props) => {
	const {
		period,
		page,
		startDate,
		endTime,
		currentTime,
		cameraCode,
		baseURL,
		trafficURL,
		refresh,
		setLoggedIn,
	} = props;
	const { Paragraph, Text } = Typography;

	const [isLoadingTraffic, setLoadingTraffic] = useState(true);
	const [isEmptyData, setEmptyData] = useState(false);
	const [trafficData, setTrafficData] = useState([]);
	const [curEndTime, setCurEndTime] = useState("");

	var curTime = currentTime ? currentTime : "23:59:59";
	const periodURL =
		period === "DAY" ? "/daily" : period === "WEEK" ? "/weekly" : "/monthly";
	const title = page === "REALSTATISTIC" ? `| 00:00 ~ ${curEndTime} ` : "";
	const descriptionText = (
		<>
			<Paragraph>
				해당하는 구간의 차종별 통계 정보와 평균 속도에 대한 정보를 그래프로
				표시합니다
			</Paragraph>
			<Paragraph>표시항목:</Paragraph>
			<Paragraph>
				<ul>
					<li>
						<Text>통행량</Text>
					</li>
					<li>
						<Text>차종 별 과속 차량 수</Text>
					</li>
					<li>
						<Text>전체 차량 평균속도</Text>
					</li>
					<li>
						<Text>차종 별 평균 속도</Text>
					</li>
				</ul>
				<Paragraph>*항목별 상세사항은 매뉴얼에 기재 됨</Paragraph>
			</Paragraph>
		</>
	);

	useEffect(() => {
		setEmptyData(false);
		setLoadingTraffic(true);
		setTrafficData([]);
		getTrafficData();
	}, [cameraCode, startDate, endTime, currentTime]);

	useEffect(() => {
		if (refresh) {
			setEmptyData(false);
			setLoadingTraffic(true);
			setTrafficData([]);
			getTrafficData();
		}
	}, [refresh]);

	const getTrafficData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} ${curTime}&axis=time&laneNumber=0`,
				{
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
					setTrafficData(res.data);
					setCurEndTime(
						moment(new Date(res.data[res.data.length - 1].recordTime))
							.add(15, "m")
							.format("HH:mm")
					);
					setLoadingTraffic(false);
					setEmptyData(false);
				} else {
					setEmptyData(true);
					message.warning("해당 기간 시간 별 데이터가 없습니다");
				}
			})
			.catch((err) => {
				setEmptyData(true);
				if (err.response.status === 401) {
					setLoggedIn(false);
				}
			});
	};

	return (
		<>
			{!isEmptyData && !isLoadingTraffic && (
				<NotificationButton description={descriptionText} />
			)}
			<div className="general-graph-layout">
				{!isEmptyData ? (
					isLoadingTraffic ? (
						<div
							style={{
								marginTop: 20,
								marginBottom: 20,
								textAlign: "center",
								paddingTop: 30,
								paddingBottom: 30,
							}}
						>
							<Spin size="large" />
						</div>
					) : (
						<>
							<div className="general-graph-card">
								<VisualizationCard
									title={`차종별 통행량 ${title}`}
									chart={<VehicleRatio trafficData={trafficData} page={page} />}
								/>
								<VisualizationCard
									title={`차종별 과속차량 ${title}`}
									chart={<OverSpeedBar trafficData={trafficData} page={page} />}
								/>
							</div>
							<div className="general-graph-card">
								<VisualizationCard
									title={`평균속도 ${title}`}
									chart={
										<AvgSpeedGauge trafficData={trafficData} page={page} />
									}
								/>
								<VisualizationCard
									title={`차종별 평균속도 ${title}`}
									chart={<AvgSpeedBar trafficData={trafficData} page={page} />}
								/>
							</div>
						</>
					)
				) : null}
			</div>
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
	};
};

export default connect(mapStateToProps)(GeneralVisualization);
