import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";

// import axios from "axios";
// import { connect } from "react-redux";
// import * as actions from "../../../actions";

const PCULine = (props) => {
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

	const [Data, setData] = useState([]);

	var PCUTotalData = [];
	var PCULaneData = {};
	for (let idx = 1; idx <= totalLaneNumber; idx++) {
		PCULaneData[idx.toString()] = [];
	}

	useEffect(() => {
		if (activeVisualKey === "2") {
			if (isLoadingTrafficLane === false && isLoadingTrafficLane === false) {
				console.log("activeVisualKey", activeVisualKey);
				currentLaneNumber === 0 ? parseTotalData() : parseLaneData();
			}
		}
	}, [
		currentLaneNumber,
		activeVisualKey,
		isLoadingTrafficTotal,
		isLoadingTrafficLane,
	]);

	const parseTotalData = () => {
		if (totalData.length !== 0) {
			console.log("count total has data");
			setData(totalData);
		} else {
			console.log("count count parse");
			trafficTotalData.forEach((TrafficData) => {
				const {
					recordTime,
					carCnt,
					mBusCnt,
					mTruckCnt,
					motorCnt,
				} = TrafficData;
				let tempCar = {};
				let tempBus = {};
				let tempTruck = {};
				let tempMotor = {};

				tempCar["time"] = recordTime.substring(11, 16);
				tempCar["value"] = carCnt;
				tempCar["category"] = "승용차";

				tempBus["time"] = recordTime.substring(11, 16);
				tempBus["value"] = parseFloat((mBusCnt * 1.8).toFixed(1));
				tempBus["category"] = "버스";

				tempTruck["time"] = recordTime.substring(11, 16);
				tempTruck["value"] = parseFloat((mTruckCnt * 1.8).toFixed(1));
				tempTruck["category"] = "화물차";

				tempMotor["time"] = recordTime.substring(11, 16);
				tempMotor["value"] = motorCnt;
				tempMotor["category"] = "오토바이";
				PCUTotalData.push(tempCar);
				PCUTotalData.push(tempBus);
				PCUTotalData.push(tempTruck);
				PCUTotalData.push(tempMotor);
			});
			setTotalData(PCUTotalData);
			setData(PCUTotalData);
		}
	};

	const parseLaneData = () => {
		if (Object.keys(laneData).length !== 0) {
			console.log("count lane has data");
			setData(laneData[currentLaneNumber.toString()]);
		} else {
			console.log("count count parse lane");
			trafficLaneData.forEach((TrafficData) => {
				const {
					laneNumber,
					recordTime,
					carCnt,
					mBusCnt,
					mTruckCnt,
					motorCnt,
				} = TrafficData;
				let tempCar = {};
				let tempBus = {};
				let tempTruck = {};
				let tempMotor = {};

				tempCar["time"] = recordTime.substring(11, 16);
				tempCar["value"] = carCnt;
				tempCar["category"] = "승용차";

				tempBus["time"] = recordTime.substring(11, 16);
				tempBus["value"] = (mBusCnt * 1.8).toFixed(1);
				tempBus["category"] = "버스";

				tempTruck["time"] = recordTime.substring(11, 16);
				tempTruck["value"] = (mTruckCnt * 1.8).toFixed(1);
				tempTruck["category"] = "화물차";

				tempMotor["time"] = recordTime.substring(11, 16);
				tempMotor["value"] = motorCnt;
				tempMotor["category"] = "오토바이";

				PCULaneData[laneNumber.toString()].push(tempCar);
				PCULaneData[laneNumber.toString()].push(tempBus);
				PCULaneData[laneNumber.toString()].push(tempTruck);
				PCULaneData[laneNumber.toString()].push(tempMotor);
			});
			setLaneData(PCULaneData);
			setData(PCULaneData[currentLaneNumber.toString()]);
		}
	};

	var config = {
		data: Data,
		xField: "time",
		yField: "value",
		seriesField: "category",
		// xAxis: { type: "time" },
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
				},
			},
		},
	};
	return <Line {...config} />;
};

export default PCULine;
