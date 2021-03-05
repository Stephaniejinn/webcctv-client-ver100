import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

import TableCard from "../../../molecules/tableCard/TableCard";
import DataVisualization from "../../../molecules/dataVisualization/DataVisualization";
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
	const [isLoadingTrafficH, setLoadingTrafficH] = useState(true);
	const [isLoadingOverSpeed, setLoadingOverSpeed] = useState(true);
	const [isLoadingPeak, setLoadingPeak] = useState([]);
	const [isLoadingPedestrians, setLoadingPedestrians] = useState([]);

	const [totalLaneArr, setTotalLaneArr] = useState([]);
	const [currentLaneNum, setCurrentLaneNum] = useState("0");
	const [laneNum, setLaneNum] = useState(0);
	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [trafficTotalData, setTrafficTotalData] = useState([]);
	const [trafficLaneData, setTrafficLaneData] = useState([]);
	const [trafficHData, setTrafficHData] = useState([]);
	const [overSpeedData, setOverSpeedData] = useState([]);
	const [peakData, setPeakData] = useState([]);
	const [pedestriansData, setPedestriansData] = useState([]);

	const [cntTotalData, setCntTotalData] = useState([]);
	const [cntLaneData, setCntLaneData] = useState({});

	const [PCUTotalData, setPCUTotalData] = useState([]);
	const [PCULaneData, setPCULaneData] = useState({});

	const [avgSpeedTotalData, setAvgSpeedTotalData] = useState([]);
	const [avgSpeedLaneData, setAvgSpeedLaneData] = useState({});

	const [dayNightTotalData, setDayNightTotalData] = useState([]);
	const [dayNightLaneData, setDayNightLaneData] = useState({});

	const trafficURL = "/statistics/traffic";
	const pedestriansURL = "/statistics/pedestrians";
	const violationURL = "/violations/speeding";
	const group = timeClassification ? "time" : "lane";

	var tabLaneNum = ["구간 전체"];

	useEffect(() => {
		getLaneNum();
		getTrafficTotalData();
		getTrafficLaneData();
		getTrafficHData();
		getPeakData();
		getPedestriansData();
	}, []);

	const getLaneNum = () => {
		axios
			.get(
				`${baseURL}${trafficURL}?groupBy=lane&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59`,
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
				`${baseURL}${trafficURL}?groupBy=${group}&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59&interval=15M&limit=0&offset=0`,
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
				`${baseURL}${trafficURL}?groupBy=none&camCode=0004&startDate=2020-08-03&endTime=2020-08-03 23:59:59&interval=15M&limit=0&offset=0`,
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
	const getTrafficHData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}?groupBy=none&camCode=0004&startDate=2020-10-08&endTime=2020-10-08 23:59:59&interval=1H&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setTrafficHData(res.data);
				setLoadingTrafficH(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	// const getOverSpeedData = () => {
	// 	axios
	// 		.get(
	// 			`${baseURL}${currentURL}groupBy=none&camCode=0004&startDate=2020-10-08&endTime=2020-10-08 23:59:59&interval=1H&limit=0&offset=0`,
	// 			{
	// 				headers: {
	// 					Authorization: `Bearer ${localStorage.getItem("token")}`,
	// 					Cache: "No-cache",
	// 				},
	// 			}
	// 		)
	// 		.then((res) => {
	// 			setTrafficHData(res.data);
	// 			setLoadingTrafficH(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };
	const getPeakData = () => {
		axios
			.get(
				`${baseURL}${trafficURL}/peak?camCode=0004&startDate=2020-12-01&endTime=2020-12-01 23:59:59`,
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
				`${baseURL}${pedestriansURL}?camCode=0004&startDate=2020-05-04&endTime=2020-05-04 23:59:59&interval=15M&limit=0&offset=0`,
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
								<DataVisualization
									period={period}
									timeClassification={timeClassification}
									totalLaneNumber={laneNum}
									currentLaneNum={currentLaneNum}
									setCurrentLaneNum={setCurrentLaneNum}
									activeVisualKey={activeVisualKey}
									setActiveVisualKey={setActiveVisualKey}
									isLoadingTrafficTotal={isLoadingTrafficTotal}
									isLoadingTrafficLane={isLoadingTrafficLane}
									isLoadingPedestrians={isLoadingPedestrians}
									isLoadingPeak={isLoadingPeak}
									trafficTotalData={trafficTotalData}
									trafficLaneData={trafficLaneData}
									trafficHData={trafficHData}
									overSpeedData={overSpeedData}
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
									avgSpeedTotalData={avgSpeedTotalData}
									setAvgSpeedTotalData={setAvgSpeedTotalData}
									avgSpeedLaneData={avgSpeedLaneData}
									setAvgSpeedLaneData={setAvgSpeedLaneData}
									dayNightTotalData={dayNightTotalData}
									setDayNightTotalData={setDayNightTotalData}
									dayNightLaneData={dayNightLaneData}
									setDayNightLaneData={setDayNightLaneData}
								/>
								<TableCard
									period={period}
									tableKey="first"
									lane={currentLaneNum}
									isLoadingTrafficTotal={isLoadingTrafficTotal}
									isLoadingTrafficLane={isLoadingTrafficLane}
									isLoadingPedestrians={isLoadingPedestrians}
									trafficTotalData={trafficTotalData}
									trafficLaneData={trafficLaneData}
									pedestriansData={pedestriansData}
									timeClassification={timeClassification}
									startDate={startDate}
									endTime={endTime}
									interval="15M"
								/>
								<TableCard
									period={period}
									tableKey="second"
									lane={currentLaneNum}
									startDate={startDate}
									endTime={endTime}
									timeClassification={timeClassification}
									interval="15M"
								/>
								<TableCard
									period={period}
									tableKey="overSpeed"
									lane={currentLaneNum}
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
