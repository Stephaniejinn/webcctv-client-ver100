import React, { useState, useEffect } from "react";
import { Spin } from "antd";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions";

import LaneTableCard from "../../../molecules/tableCard/LaneTableCard";
import LaneDataVisualization from "../../../molecules/dataVisualization/LaneDataVisualization";
import "./style.less";

const LaneVisualization = (props) => {
	const {
		period,
		startDate,
		endTime,
		cameraCode,
		baseURL,
		trafficURL,
		additionalFilter,
	} = props;

	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);
	const [trafficTotalData, setTrafficTotalData] = useState([]);

	const periodURL =
		period === "DAY" ? "/daily" : period === "WEEK" ? "/weekly" : "/monthly";

	const currentURL =
		period === "DAY"
			? `${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=lane`
			: `${baseURL}${trafficURL}${periodURL}?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=lane&weekOption=${additionalFilter}`;

	useEffect(() => {
		getTrafficTotalData();
	}, [cameraCode, startDate, endTime, additionalFilter]);

	const getTrafficTotalData = () => {
		axios
			.get(`${currentURL}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				setTrafficTotalData(res.data);
				console.log(res.data);
				setLoadingTrafficTotal(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			{isLoadingTrafficTotal ? (
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
			)}
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
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationCodeInfo: () => {
			dispatch(actions.getLocationCode());
		},
		getBaseURL: () => {
			dispatch(actions.getURL());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(LaneVisualization);
