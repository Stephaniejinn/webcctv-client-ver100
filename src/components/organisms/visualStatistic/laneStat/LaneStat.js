import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Spin, Typography, message } from "antd";

import LaneDataVisualization from "../../../molecules/dataVisualization/LaneDataVisualization";
import LaneTableCard from "../../../molecules/tableCard/LaneTableCard";
import "../style.less";

const LaneVisualization = (props) => {
	const {
		period,
		startDate,
		endTime,
		cameraCode,
		baseURL,
		trafficURL,
		additionalFilter,
		setLoggedIn,
		setEmptyErr,
		setFutureErr,
	} = props;
	const { Text } = Typography;
	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);
	const [isEmptyData, setEmptyData] = useState(false);
	const [trafficTotalData, setTrafficTotalData] = useState([]);

	const periodURL =
		period === "DAY" ? "/daily" : period === "WEEK" ? "/weekly" : "/monthly";

	const currentURL =
		period === "DAY"
			? `${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=lane`
			: `${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=lane&weekOption=${additionalFilter}`;

	useEffect(() => {
		if (cameraCode !== "" && startDate !== "" && endTime !== "") {
			setEmptyData(false);
			setLoadingTrafficTotal(true);
			setTrafficTotalData([]);
			getTrafficTotalData();
		}
	}, [cameraCode, startDate, endTime, additionalFilter]);

	const getTrafficTotalData = () => {
		axios
			.get(`${currentURL}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				setTrafficTotalData(res.data);
				if (res.data.length !== 0) {
					setLoadingTrafficTotal(false);
					setEmptyData(false);
					setEmptyErr(false);
					setFutureErr(false);
				} else {
					setEmptyData(true);
					message.warning("해당 기간 데이터가 없습니다");
					if (setEmptyErr) {
						setEmptyErr(true);
						setFutureErr(false);
					}
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

	return (
		<>
			{!isEmptyData ? (
				isLoadingTrafficTotal ? (
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
						<LaneDataVisualization
							period={period}
							activeVisualKey={activeVisualKey}
							setActiveVisualKey={setActiveVisualKey}
							trafficTotalData={trafficTotalData}
						/>
						<LaneTableCard
							period={period}
							tableKey="first"
							startDate={startDate}
							endTime={endTime}
							trafficTotalData={trafficTotalData}
						/>
					</>
				)
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

export default connect(mapStateToProps)(LaneVisualization);
