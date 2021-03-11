import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

import TimeTableCard from "../../../molecules/tableCard/TimeTableCard";
import TimeDataVisualization from "../../../molecules/dataVisualization/TimeDataVisualization";
import "./style.less";

const TimeVisualization = (props) => {
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

	const [isLoadingLane, setLoadingLane] = useState(true);
	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);
	const [isLoadingTrafficLane, setLoadingTrafficLane] = useState(true);
	const [isLoadingOverSpeedTotal, setLoadingOverSpeedTotal] = useState(true);
	const [isLoadingOverSpeedLane, setLoadingOverSpeedLane] = useState(true);
	const [isLoadingPeak, setLoadingPeak] = useState([]);
	const [isLoadingPedestrians, setLoadingPedestrians] = useState([]);

	const [totalLaneArr, setTotalLaneArr] = useState([]);
	const [currentLaneNum, setCurrentLaneNum] = useState("0");
	const [laneNum, setLaneNum] = useState(0);
	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [trafficTotalData, setTrafficTotalData] = useState([]);
	const [trafficLaneData, setTrafficLaneData] = useState([]);
	const [overSpeedTotalData, setOverSpeedTotalData] = useState([]);
	const [overSpeedLaneData, setOverSpeedLaneData] = useState([]);
	const [peakData, setPeakData] = useState([]);
	const [pedestriansData, setPedestriansData] = useState([]);

	const [cntTotalData, setCntTotalData] = useState([]);
	const [cntLaneData, setCntLaneData] = useState({});

	const [PCUTotalData, setPCUTotalData] = useState([]);
	const [PCULaneData, setPCULaneData] = useState({});

	const [ratioTotalData, setRatioTotalData] = useState([]);
	const [ratioLaneData, setRatioLaneData] = useState({});

	const [avgSpeedTotalData, setAvgSpeedTotalData] = useState([]);
	const [avgSpeedLaneData, setAvgSpeedLaneData] = useState({});

	const [overSpeedCntTotalData, setOverSpeedCntTotalData] = useState([]);
	const [overSpeedCntLaneData, setOverSpeedCntLaneData] = useState({});

	const [dayNightTotalData, setDayNightTotalData] = useState([]);
	const [dayNightLaneData, setDayNightLaneData] = useState({});

	const trafficURL = "/statistics/traffic";
	const pedestriansURL = "/statistics/pedestrians";
	const violationURL = "/violations/speeding";

	const group = timeClassification ? "time" : "lane";

	var tabLaneNum = ["구간 전체"];

	useEffect(() => {
		getLaneNum();
	}, [cameraCode]);

	useEffect(() => {
		getTrafficTotalData();
		getTrafficLaneData();
		getOverSpeedTotalData();
		getOverSpeedLaneData();
		getPeakData();
		getPedestriansData();
	}, [cameraCode, startDate, endTime]);

	const getLaneNum = () => {
		axios
			.get(
				`${baseURL}${trafficURL}?groupBy=lane&camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setLaneNum(res.data.length);
				res.data.forEach((lane) => {
					const { laneNumber } = lane;
					tabLaneNum.push(`${laneNumber} 차선`);
				});
				setTotalLaneArr(tabLaneNum);
				setLoadingLane(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getTrafficTotalData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}?groupBy=${group}&camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59&interval=${interval}&limit=0&offset=0`,
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
	const getTrafficLaneData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}?groupBy=none&camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59&interval=${interval}&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setTrafficLaneData(res.data);
				setLoadingTrafficLane(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getOverSpeedTotalData = () => {
		axios
			.get(
				`${baseURL}${violationURL}?groupBy=time&camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59&interval=${interval}&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setOverSpeedTotalData(res.data);
				setLoadingOverSpeedTotal(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getOverSpeedLaneData = () => {
		axios
			.get(
				`${baseURL}${violationURL}?groupBy=none&camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59&interval=${interval}&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setOverSpeedLaneData(res.data);
				setLoadingOverSpeedLane(false);
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

	const getPedestriansData = () => {
		axios
			.get(
				`${baseURL}${pedestriansURL}?camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59&interval=${interval}&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setPedestriansData(res.data);
				setLoadingPedestrians(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	function callback(key) {
		setCurrentLaneNum(key);
		console.log("key", key);
	}
	return (
		<Tabs defaultActiveKey="0" activeKey={currentLaneNum} onChange={callback}>
			{!isLoadingLane
				? totalLaneArr.map((tabName, index) => {
						return (
							<TabPane tab={tabName} key={index.toString()}>
								{/* <TabPane tab="{tabName}" key="0"> */}
								<TimeDataVisualization
									period={period}
									timeClassification={timeClassification}
									totalLaneNumber={laneNum}
									currentLaneNum={currentLaneNum}
									setCurrentLaneNum={setCurrentLaneNum}
									activeVisualKey={activeVisualKey}
									setActiveVisualKey={setActiveVisualKey}
									isLoadingTrafficTotal={isLoadingTrafficTotal}
									isLoadingTrafficLane={isLoadingTrafficLane}
									isLoadingOverSpeedTotal={isLoadingOverSpeedTotal}
									isLoadingOverSpeedLane={isLoadingOverSpeedLane}
									isLoadingPedestrians={isLoadingPedestrians}
									isLoadingPeak={isLoadingPeak}
									trafficTotalData={trafficTotalData}
									trafficLaneData={trafficLaneData}
									overSpeedTotalData={overSpeedTotalData}
									overSpeedLaneData={overSpeedLaneData}
									peakData={peakData}
									pedestriansData={pedestriansData}
									cntTotalData={cntTotalData}
									setCntTotalData={setCntTotalData}
									cntLaneData={cntLaneData}
									setCntLaneData={setCntLaneData}
									PCUTotalData={PCUTotalData}
									setPCUTotalData={setPCUTotalData}
									PCULaneData={PCULaneData}
									setPCULaneData={setPCULaneData}
									ratioTotalData={ratioTotalData}
									setRatioTotalData={setRatioTotalData}
									ratioLaneData={ratioLaneData}
									setRatioLaneData={setRatioLaneData}
									avgSpeedTotalData={avgSpeedTotalData}
									setAvgSpeedTotalData={setAvgSpeedTotalData}
									avgSpeedLaneData={avgSpeedLaneData}
									setAvgSpeedLaneData={setAvgSpeedLaneData}
									overSpeedCntTotalData={overSpeedCntTotalData}
									setOverSpeedCntTotalData={setOverSpeedCntTotalData}
									overSpeedCntLaneData={overSpeedCntLaneData}
									setOverSpeedCntLaneData={setOverSpeedCntLaneData}
									dayNightTotalData={dayNightTotalData}
									setDayNightTotalData={setDayNightTotalData}
									dayNightLaneData={dayNightLaneData}
									setDayNightLaneData={setDayNightLaneData}
								/>
								<TimeTableCard
									period={period}
									tableKey="first"
									currentLaneNum={currentLaneNum}
									timeClassification={timeClassification}
									startDate={startDate}
									endTime={endTime}
									interval={interval}
								/>
								<TimeTableCard
									period={period}
									tableKey="overSpeed"
									currentLaneNum={currentLaneNum}
									startDate={startDate}
									endTime={endTime}
									timeClassification={timeClassification}
									interval="15M"
								/>
								<TimeTableCard
									period={period}
									tableKey="second"
									currentLaneNum={currentLaneNum}
									startDate={startDate}
									endTime={endTime}
									timeClassification={timeClassification}
									interval="15M"
								/>
							</TabPane>
						);
				  })
				: null}
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
export default connect(mapStateToProps, mapDispatchToProps)(TimeVisualization);
