import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions";

import TimeTableCard from "../../../molecules/tableCard/TimeTableCard";
import TimeDataVisualization from "../../../molecules/dataVisualization/TimeDataVisualization";
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
	} = props;
	const { TabPane } = Tabs;

	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);
	const [isEmptyData, setEmptyData] = useState(false);

	const [totalLaneArr, setTotalLaneArr] = useState([]);
	const [currentLaneNum, setCurrentLaneNum] = useState("0");
	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [trafficTotalData, setTrafficTotalData] = useState([]);

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
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				setTrafficTotalData(res.data);
				console.log(res.data);
				if (res.data.length !== 0) {
					setLoadingTrafficTotal(false);
					setEmptyData(false);
				} else {
					setEmptyData(true);
				}
			})
			.catch((err) => {
				console.log(err.response);
				setEmptyData(true);
			});
	};

	function callback(key) {
		setCurrentLaneNum(key);
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
									tableKey="overSpeed"
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
