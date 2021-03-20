import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions";

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
		camLanes,
		baseURL,
		trafficURL,
	} = props;
	const { TabPane } = Tabs;

	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);

	const [totalLaneArr, setTotalLaneArr] = useState([]);
	const [currentLaneNum, setCurrentLaneNum] = useState("0");
	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [trafficTotalData, setTrafficTotalData] = useState([]);

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

	const periodURL =
		period === "DAY" ? "/daily" : period === "WEEK" ? "/Weekly" : "/Monthly";

	useEffect(() => {
		var tabLaneNum = ["구간 전체"];
		for (let idx = 1; idx <= camLanes; idx++) {
			tabLaneNum.push(`${idx} 차선`);
		}
		console.log(tabLaneNum);
		setTotalLaneArr(tabLaneNum);
	}, [camLanes]);

	useEffect(() => {
		axiosAsync();
	}, [cameraCode, startDate, endTime, currentLaneNum]);

	const axiosAsync = () => {
		axios
			.get(
				`${baseURL}${trafficURL}${periodURL}?&camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&&axis=time&laneNumber=${currentLaneNum}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				setTrafficTotalData(res.data);
				console.log(res.data);
				setLoadingTrafficTotal(false);
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
			{!isLoadingTrafficTotal
				? totalLaneArr.map((tabName, index) => {
						return (
							<TabPane tab={tabName} key={index.toString()}>
								{/* <TabPane tab="{tabName}" key="0"> */}
								<TimeDataVisualization
									period={period}
									timeClassification={timeClassification}
									totalLaneNumber={camLanes}
									currentLaneNum={currentLaneNum}
									setCurrentLaneNum={setCurrentLaneNum}
									activeVisualKey={activeVisualKey}
									setActiveVisualKey={setActiveVisualKey}
									isLoadingTrafficTotal={isLoadingTrafficTotal}
									trafficTotalData={trafficTotalData}
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
									trafficTotalData={trafficTotalData}
									startDate={startDate}
									endTime={endTime}
									interval={interval}
								/>
								<TimeTableCard
									period={period}
									tableKey="overSpeed"
									currentLaneNum={currentLaneNum}
									trafficTotalData={trafficTotalData}
									startDate={startDate}
									endTime={endTime}
									interval="15M"
								/>
								<TimeTableCard
									period={period}
									tableKey="second"
									currentLaneNum={currentLaneNum}
									trafficTotalData={trafficTotalData}
									startDate={startDate}
									endTime={endTime}
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
export default connect(mapStateToProps, mapDispatchToProps)(TimeVisualization);
