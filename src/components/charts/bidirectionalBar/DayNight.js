import React, { useState, useEffect } from "react";
import { BidirectionalBar } from "@ant-design/charts";

const MyBidirectionalBar = (props) => {
	const {
		currentLaneNumber,
		totalLaneNumber,
		activeVisualKey,
		isLoadingTrafficTotal,
		isLoadingTrafficLane,
		trafficTotalData,
		trafficLaneData,

		totalData,
		setTotalData,
		laneData,
		setLaneData,

		timeClassification,
	} = props;
	const [Data, setData] = useState([{}, {}, {}, {}]);
	var flag = false;

	// const group = timeClassification ? "time" : "lane";

	var dataSample = [
		{
			차종: "승용차",
			"주간 12시간 교통량": 0,
			"야간 12시간 교통량": 0,
		},
		{
			차종: "버스",
			"주간 12시간 교통량": 0,
			"야간 12시간 교통량": 0,
		},
		{
			차종: "화물차",
			"주간 12시간 교통량": 0,
			"야간 12시간 교통량": 0,
		},
		{
			차종: "이륜차",
			"주간 12시간 교통량": 0,
			"야간 12시간 교통량": 0,
		},
	];

	var dayNightLaneData = {};

	for (let idx = 1; idx <= totalLaneNumber; idx++) {
		dayNightLaneData[idx.toString()] = dataSample;
	}

	useEffect(() => {
		// console.log("trafficTotalData,1", trafficTotalData);
		if (isLoadingTrafficTotal === false && isLoadingTrafficLane === false) {
			setTotalData([]);
			setLaneData({});
			currentLaneNumber === 0 ? parseTotalData() : parseLaneData();
		}
	}, [
		trafficLaneData,
		trafficTotalData,
		isLoadingTrafficTotal,
		isLoadingTrafficLane,
	]);

	useEffect(() => {
		if (activeVisualKey === "6") {
			if (isLoadingTrafficTotal === false && isLoadingTrafficLane === false) {
				currentLaneNumber === 0 ? parseTotalData() : parseLaneData();
			}
		}
	}, [
		currentLaneNumber,
		activeVisualKey,
		// isLoadingTrafficTotal,
		// isLoadingTrafficLane,
	]);

	const parseTotalData = () => {
		if (totalData.length !== 0) {
			console.log("bi total has data");
			setData(totalData);
		} else {
			console.log("count bi total parse");
			trafficTotalData.forEach((TrafficData) => {
				const {
					recordTime,
					carCnt,
					mBusCnt,
					mTruckCnt,
					motorCnt,
				} = TrafficData;

				if (!flag) {
					dataSample[0]["야간 12시간 교통량"] += carCnt;
					dataSample[1]["야간 12시간 교통량"] += mBusCnt;
					dataSample[2]["야간 12시간 교통량"] += mTruckCnt;
					dataSample[3]["야간 12시간 교통량"] += motorCnt;

					if (recordTime.substring(11, 16) === "06:45") {
						flag = true;
					}
				} else {
					console.log("isDay", flag);

					dataSample[0]["주간 12시간 교통량"] += carCnt;
					dataSample[1]["주간 12시간 교통량"] += mBusCnt;
					dataSample[2]["주간 12시간 교통량"] += mTruckCnt;
					dataSample[3]["주간 12시간 교통량"] += motorCnt;
					if (recordTime.substring(11, 16) === "18:45") {
						flag = false;
					}
				}
			});
			setTotalData(dataSample);
			setData(dataSample);
		}
	};

	const parseLaneData = () => {
		if (Object.keys(laneData).length !== 0) {
			console.log("bi lane has data");
			setData(laneData[currentLaneNumber.toString()]);
		} else {
			console.log("count bi lane parse");
			trafficLaneData.forEach((TrafficData) => {
				const {
					laneNumber,
					recordTime,
					carCnt,
					mBusCnt,
					mTruckCnt,
					motorCnt,
				} = TrafficData;
				if (!flag) {
					dayNightLaneData[laneNumber.toString()][0][
						"야간 12시간 교통량"
					] += carCnt;
					dayNightLaneData[laneNumber.toString()][1][
						"야간 12시간 교통량"
					] += mBusCnt;
					dayNightLaneData[laneNumber.toString()][2][
						"야간 12시간 교통량"
					] += mTruckCnt;
					dayNightLaneData[laneNumber.toString()][3][
						"야간 12시간 교통량"
					] += motorCnt;
					if (recordTime.substring(11, 16) === "06:45") {
						flag = true;
					}
				} else {
					dayNightLaneData[laneNumber.toString()][0][
						"주간 12시간 교통량"
					] += carCnt;
					dayNightLaneData[laneNumber.toString()][1][
						"주간 12시간 교통량"
					] += mBusCnt;
					dayNightLaneData[laneNumber.toString()][2][
						"주간 12시간 교통량"
					] += mTruckCnt;
					dayNightLaneData[laneNumber.toString()][3][
						"주간 12시간 교통량"
					] += motorCnt;
					if (recordTime.substring(11, 16) === "18:45") {
						flag = false;
					}
				}
			});
			setLaneData(dayNightLaneData);
			setData(dayNightLaneData[currentLaneNumber.toString()]);
		}
	};

	var config = {
		data: Data,
		width: 400,
		height: 400,
		xField: "차종",
		xAxis: { position: "bottom" },
		interactions: [{ type: "active-region" }],
		yField: ["주간 12시간 교통량", "야간 12시간 교통량"],
		tooltip: {
			shared: true,
			showMarkers: false,
		},
	};
	return <BidirectionalBar {...config} />;
};

export default MyBidirectionalBar;
