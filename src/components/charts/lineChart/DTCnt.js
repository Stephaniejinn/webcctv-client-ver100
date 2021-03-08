import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";

// import axios from "axios";
// import { connect } from "react-redux";
// import * as actions from "../../../actions";

const CntLine = (props) => {
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

	var cntTotalData = [];
	var cntLaneData = {};
	for (let idx = 1; idx <= totalLaneNumber; idx++) {
		cntLaneData[idx.toString()] = [];
	}

	useEffect(() => {
		if (activeVisualKey === "1") {
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
				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};
				tempCar["time"] = recordTime.substring(11, 16);
				tempCar["value"] = carCnt;
				tempCar["category"] = "승용차";

				tempBus["time"] = recordTime.substring(11, 16);
				tempBus["value"] = mBusCnt;
				tempBus["category"] = "버스";

				tempTruck["time"] = recordTime.substring(11, 16);
				tempTruck["value"] = mTruckCnt;
				tempTruck["category"] = "화물차";

				tempMotor["time"] = recordTime.substring(11, 16);
				tempMotor["value"] = motorCnt;
				tempMotor["category"] = "오토바이";
				cntTotalData.push(tempCar);
				cntTotalData.push(tempBus);
				cntTotalData.push(tempTruck);
				cntTotalData.push(tempMotor);
			});
			setTotalData(cntTotalData);
			setData(cntTotalData);
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
				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};
				tempCar["time"] = recordTime.substring(11, 16);
				tempCar["value"] = carCnt;
				tempCar["category"] = "승용차";

				tempBus["time"] = recordTime.substring(11, 16);
				tempBus["value"] = mBusCnt;
				tempBus["category"] = "버스";

				tempTruck["time"] = recordTime.substring(11, 16);
				tempTruck["value"] = mTruckCnt;
				tempTruck["category"] = "화물차";

				tempMotor["time"] = recordTime.substring(11, 16);
				tempMotor["value"] = motorCnt;
				tempMotor["category"] = "오토바이";

				cntLaneData[laneNumber.toString()].push(tempCar);
				cntLaneData[laneNumber.toString()].push(tempBus);
				cntLaneData[laneNumber.toString()].push(tempTruck);
				cntLaneData[laneNumber.toString()].push(tempMotor);
			});
			setLaneData(cntLaneData);
			setData(cntLaneData[currentLaneNumber.toString()]);
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

export default CntLine;
