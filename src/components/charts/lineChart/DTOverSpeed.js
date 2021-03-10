import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";
// import axios from "axios";
// import { connect } from "react-redux";
// import * as actions from "../../../actions";

const OverSpeedCnt = (props) => {
	const {
		currentLaneNumber,
		totalLaneNumber,
		activeVisualKey,
		isLoadingOverSpeedTotal,
		isLoadingOverSpeedLane,
		overSpeedTotalData,
		overSpeedLaneData,

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
		if (isLoadingOverSpeedTotal === false && isLoadingOverSpeedLane === false) {
			console.log("trafficTotalData,1", overSpeedTotalData);
			setTotalData([]);
			setLaneData({});
			currentLaneNumber === 0 ? parseTotalData() : parseLaneData();
		}
	}, [
		overSpeedTotalData,
		overSpeedLaneData,
		isLoadingOverSpeedTotal,
		isLoadingOverSpeedLane,
	]);

	useEffect(() => {
		if (activeVisualKey === "5") {
			if (
				isLoadingOverSpeedTotal === false &&
				isLoadingOverSpeedLane === false
			) {
				currentLaneNumber === 0 ? parseTotalData() : parseLaneData();
			}
		}
	}, [
		currentLaneNumber,
		activeVisualKey,
		// isLoadingOverSpeedTotal,
		// isLoadingOverSpeedLane,
	]);

	const parseTotalData = () => {
		if (totalData.length !== 0) {
			console.log("count total has data");
			setData(totalData);
		} else {
			console.log("count count parse");
			overSpeedTotalData.forEach((TrafficData) => {
				const {
					recordTime,
					carSpdCnt,
					mBusSpdCnt,
					mTruckSpdCnt,
					motorSpdCnt,
				} = TrafficData;
				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};
				tempCar["time"] = moment(recordTime).format("HH:mm");
				tempCar["value"] = carSpdCnt;
				tempCar["category"] = "승용차";

				tempBus["time"] = moment(recordTime).format("HH:mm");
				tempBus["value"] = mBusSpdCnt;
				tempBus["category"] = "버스";

				tempTruck["time"] = moment(recordTime).format("HH:mm");
				tempTruck["value"] = mTruckSpdCnt;
				tempTruck["category"] = "화물차";

				tempMotor["time"] = moment(recordTime).format("HH:mm");
				tempMotor["value"] = motorSpdCnt;
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
			overSpeedLaneData.forEach((TrafficData) => {
				const {
					laneNumber,
					recordTime,
					carSpdCnt,
					mBusSpdCnt,
					mTruckSpdCnt,
					motorSpdCnt,
				} = TrafficData;
				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};
				tempCar["time"] = moment(recordTime).format("HH:mm");
				tempCar["value"] = carSpdCnt;
				tempCar["category"] = "승용차";

				tempBus["time"] = moment(recordTime).format("HH:mm");
				tempBus["value"] = mBusSpdCnt;
				tempBus["category"] = "버스";

				tempTruck["time"] = moment(recordTime).format("HH:mm");
				tempTruck["value"] = mTruckSpdCnt;
				tempTruck["category"] = "화물차";

				tempMotor["time"] = moment(recordTime).format("HH:mm");
				tempMotor["value"] = motorSpdCnt;
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

export default OverSpeedCnt;
