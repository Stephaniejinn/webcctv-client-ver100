import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

import LaneTableCard from "../../../molecules/tableCard/LaneTableCard";
import LaneDataVisualization from "../../../molecules/dataVisualization/LaneDataVisualization";
import "./style.less";

const LaneVisualization = (props) => {
	const {
		period,
		startDate,
		endTime,
		timeClassification,
		interval,
		cameraCode,
		baseURL,
	} = props;
	const { TabPane } = Tabs;

	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);
	const [isLoadingOverSpeed, setLoadingOverSpeed] = useState(true);
	const [isLoadingPeak, setLoadingPeak] = useState([]);

	const [trafficTotalData, setTrafficTotalData] = useState([]);
	const [overSpeedData, setOverSpeedData] = useState([]);
	const [peakData, setPeakData] = useState([]);

	const [cntTotalData, setCntTotalData] = useState([]);
	const [PCUTotalData, setPCUTotalData] = useState([]);
	const [ratioTotalData, setRatioTotalData] = useState([]);
	const [avgSpeedTotalData, setAvgSpeedTotalData] = useState([]);
	const [overSpeedCntTotalData, setOverSpeedCntTotalData] = useState([]);

	// const [currentLaneNum, setCurrentLaneNum] = useState("0");
	// const [laneNum, setLaneNum] = useState(0);

	const trafficURL = "/statistics/traffic";
	const violationURL = "/violations/speeding";
	const group = timeClassification ? "time" : "lane";

	useEffect(() => {
		getTrafficTotalData();
		getOverSpeedData();
		getPeakData();
	}, [cameraCode, startDate, endTime]);

	const getTrafficTotalData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}?groupBy=${group}&camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setTrafficTotalData(res.data);
				setLoadingTrafficTotal(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const getOverSpeedData = () => {
		axios
			.get(
				`${baseURL}${violationURL}?groupBy=${group}&camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setOverSpeedData(res.data);
				setLoadingOverSpeed(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getPeakData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}/peak?camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setPeakData(res.data);
				setLoadingPeak(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	function callback(key) {
		// setCurrentLaneNum(key);
		// console.log("key", key);
	}
	return (
		<Tabs defaultActiveKey="0" onChange={callback}>
			<TabPane tab="일간 전체" key="0">
				<LaneDataVisualization
					period={period}
					timeClassification={timeClassification}
					// totalLaneNumber={laneNum}
					// currentLaneNum={currentLaneNum}
					// setCurrentLaneNum={setCurrentLaneNum}
					activeVisualKey={activeVisualKey}
					setActiveVisualKey={setActiveVisualKey}
					isLoadingTrafficTotal={isLoadingTrafficTotal}
					isLoadingOverSpeed={isLoadingOverSpeed}
					isLoadingPeak={isLoadingPeak}
					trafficTotalData={trafficTotalData}
					overSpeedData={overSpeedData}
					peakData={peakData}
					cntTotalData={cntTotalData}
					setCntTotalData={setCntTotalData}
					PCUTotalData={PCUTotalData}
					setPCUTotalData={setPCUTotalData}
					ratioTotalData={ratioTotalData}
					setRatioTotalData={setRatioTotalData}
					avgSpeedTotalData={avgSpeedTotalData}
					setAvgSpeedTotalData={setAvgSpeedTotalData}
					overSpeedCntTotalData={overSpeedCntTotalData}
					setOverSpeedCntTotalData={setOverSpeedCntTotalData}
				/>
				<LaneTableCard
					period={period}
					tableKey="first"
					timeClassification={timeClassification}
					startDate={startDate}
					endTime={endTime}
					// interval={interval}
				/>
				<LaneTableCard
					period={period}
					tableKey="overSpeed"
					// lane={currentLaneNum}
					startDate={startDate}
					endTime={endTime}
					timeClassification={timeClassification}
					interval="15M"
				/>
			</TabPane>
		</Tabs>
	);
};

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
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
