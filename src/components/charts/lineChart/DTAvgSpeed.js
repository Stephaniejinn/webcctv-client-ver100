import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

const LaneAvgSpeedLine = (props) => {
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

	// const group = timeClassification ? "time" : "lane";
	var avgSpeedTotalData = [];
	var avgSpeedLaneData = {};

	for (let idx = 1; idx <= totalLaneNumber; idx++) {
		avgSpeedLaneData[idx.toString()] = [];
	}
	useEffect(() => {
		if (isLoadingTrafficTotal === false && isLoadingTrafficLane === false) {
			console.log("trafficTotalData,1", trafficTotalData);
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
		if (activeVisualKey === "4") {
			if (isLoadingTrafficLane === false && isLoadingTrafficLane === false) {
				console.log("activeVisualKey", activeVisualKey);
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
			console.log("avg speed has total data");
			setData(totalData);
		} else {
			console.log("count over speed parse");
			trafficTotalData.forEach((TrafficData) => {
				const {
					recordTime,
					carAvgSpeed,
					mBusAvgSpeed,
					mTruckAvgSpeed,
					motorAvgSpeed,
				} = TrafficData;
				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};
				tempCar["time"] = moment(recordTime).format("HH:mm");
				tempCar["value"] = parseFloat(carAvgSpeed);
				tempCar["category"] = "승용차";

				tempBus["time"] = moment(recordTime).format("HH:mm");
				tempBus["value"] = parseFloat(mBusAvgSpeed);
				tempBus["category"] = "버스";

				tempTruck["time"] = moment(recordTime).format("HH:mm");
				tempTruck["value"] = parseFloat(mTruckAvgSpeed);
				tempTruck["category"] = "화물차";

				tempMotor["time"] = moment(recordTime).format("HH:mm");
				tempMotor["value"] = parseFloat(motorAvgSpeed);
				tempMotor["category"] = "오토바이";

				avgSpeedTotalData.push(tempCar);
				avgSpeedTotalData.push(tempBus);
				avgSpeedTotalData.push(tempTruck);
				avgSpeedTotalData.push(tempMotor);
			});
			setTotalData(avgSpeedTotalData);
			setData(avgSpeedTotalData);
		}
	};

	const parseLaneData = () => {
		if (Object.keys(laneData).length !== 0) {
			console.log("avg speed has lane data");
			setData(laneData[currentLaneNumber.toString()]);
		} else {
			console.log("count avg speed lane parse");
			trafficLaneData.forEach((TrafficData) => {
				const {
					laneNumber,
					recordTime,
					carAvgSpeed,
					mBusAvgSpeed,
					mTruckAvgSpeed,
					motorAvgSpeed,
				} = TrafficData;
				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};
				tempCar["time"] = moment(recordTime).format("HH:mm");
				tempCar["value"] = parseFloat(carAvgSpeed);
				tempCar["category"] = "승용차";

				tempBus["time"] = moment(recordTime).format("HH:mm");
				tempBus["value"] = parseFloat(mBusAvgSpeed);
				tempBus["category"] = "버스";

				tempTruck["time"] = moment(recordTime).format("HH:mm");
				tempTruck["value"] = parseFloat(mTruckAvgSpeed);
				tempTruck["category"] = "화물차";

				tempMotor["time"] = moment(recordTime).format("HH:mm");
				tempMotor["value"] = parseFloat(motorAvgSpeed);
				tempMotor["category"] = "오토바이";

				avgSpeedLaneData[laneNumber.toString()].push(tempCar);
				avgSpeedLaneData[laneNumber.toString()].push(tempBus);
				avgSpeedLaneData[laneNumber.toString()].push(tempTruck);
				avgSpeedLaneData[laneNumber.toString()].push(tempMotor);
			});
			setLaneData(avgSpeedLaneData);
			setData(avgSpeedLaneData[currentLaneNumber.toString()]);
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
export default LaneAvgSpeedLine;
