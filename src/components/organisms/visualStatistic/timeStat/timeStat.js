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
		camera,
	} = props;
	const { TabPane } = Tabs;

	const [isLoading, setLoading] = useState(true);
	const [totalLaneArr, setTotalLaneArr] = useState([]);
	const [currentLaneNum, setCurrentLaneNum] = useState("0");
	const [laneNum, setLaneNum] = useState(0);
	const [activeVisualKey, setActiveVisualKey] = useState("1");

	const [isLoadingCntData, setLoadingCntData] = useState(true);
	const [cntTotalData, setCntTotalData] = useState([]);
	const [cntLaneData, setCntLaneData] = useState({});

	const [isLoadingOverSpeedData, setLoadingOverSpeedData] = useState(true);
	const [overSpeedTotalData, setOverSpeedTotalData] = useState([]);
	const [overSpeedLaneData, setOverSpeedLaneData] = useState({});

	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/statistics/traffic?";

	var tabLaneNum = ["구간 전체"];

	useEffect(() => {
		getLaneNum();
	}, []);

	const getLaneNum = () => {
		// console.log("getLaneNum");
		axios
			.get(
				`${baseURL}${currentURL}groupBy=lane&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59`,
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
				setLoading(false);
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
			{!isLoading
				? totalLaneArr.map((tabName, index) => {
						return (
							<TabPane tab={tabName} key={index.toString()}>
								<DataVisualization
									period={period}
									totalLaneNumber={laneNum}
									currentLaneNum={currentLaneNum}
									setCurrentLaneNum={setCurrentLaneNum}
									activeVisualKey={activeVisualKey}
									setActiveVisualKey={setActiveVisualKey}
									startDate={startDate}
									endTime={endTime}
									timeClassification={timeClassification}
									interval={interval}
									isLoadingCntData={isLoadingCntData}
									setLoadingCntData={setLoadingCntData}
									cntTotalData={cntTotalData}
									setCntTotalData={setCntTotalData}
									cntLaneData={cntLaneData}
									setCntLaneData={setCntLaneData}
									isLoadingOverSpeedData={isLoadingOverSpeedData}
									setLoadingOverSpeedData={setLoadingOverSpeedData}
									overSpeedTotalData={overSpeedTotalData}
									setOverSpeedTotalData={setOverSpeedTotalData}
									overSpeedLaneData={overSpeedLaneData}
									setOverSpeedLaneData={setOverSpeedLaneData}
								/>
								<TableCard
									period={period}
									tableKey="first"
									lane={index}
									startDate={startDate}
									endTime={endTime}
									timeClassification={timeClassification}
									interval="15M"
								/>
								<TableCard
									period={period}
									tableKey="second"
									lane={index}
									startDate={startDate}
									endTime={endTime}
									timeClassification={timeClassification}
									interval="15M"
								/>
								<TableCard
									period={period}
									tableKey="overSpeed"
									lane={index}
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
		camera: state.location.camera,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationInfo: () => {
			dispatch(actions.getLocation());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TimeVisualization);
