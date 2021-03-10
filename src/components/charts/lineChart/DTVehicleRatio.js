import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";

// import axios from "axios";
// import { connect } from "react-redux";
// import * as actions from "../../../actions";

const VehicleRatio = (props) => {
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
	} = props;

	const [Data, setData] = useState([]);

	var TotalData = [];
	var LaneData = {};
	for (let idx = 1; idx <= totalLaneNumber; idx++) {
		LaneData[idx.toString()] = [];
	}

	useEffect(() => {
		console.log("trafficTotalData,1", trafficTotalData);
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
		if (activeVisualKey === "3") {
			if (isLoadingTrafficLane === false && isLoadingTrafficLane === false) {
				console.log("trafficTotalData,2");

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

				const totalCnt = carCnt + mBusCnt + mTruckCnt + motorCnt;

				tempCar["time"] = moment(recordTime).format("HH:mm");
				tempCar["value"] = parseFloat(((carCnt / totalCnt) * 100).toFixed(2));
				tempCar["category"] = "승용차";

				tempBus["time"] = moment(recordTime).format("HH:mm");
				tempBus["value"] = parseFloat(((mBusCnt / totalCnt) * 100).toFixed(2));
				tempBus["category"] = "버스";

				tempTruck["time"] = moment(recordTime).format("HH:mm");
				tempTruck["value"] = parseFloat(
					((mTruckCnt / totalCnt) * 100).toFixed(2)
				);
				tempTruck["category"] = "화물차";

				tempMotor["time"] = moment(recordTime).format("HH:mm");
				tempMotor["value"] = parseFloat(
					((motorCnt / totalCnt) * 100).toFixed(2)
				);
				tempMotor["category"] = "오토바이";
				TotalData.push(tempCar);
				TotalData.push(tempBus);
				TotalData.push(tempTruck);
				TotalData.push(tempMotor);
			});
			setTotalData(TotalData);
			setData(TotalData);
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

				const totalCnt = carCnt + mBusCnt + mTruckCnt + motorCnt;

				tempCar["time"] = moment(recordTime).format("HH:mm");
				tempCar["value"] = parseFloat(((carCnt / totalCnt) * 100).toFixed(2));
				tempCar["category"] = "승용차";

				tempBus["time"] = moment(recordTime).format("HH:mm");
				tempBus["value"] = parseFloat(((mBusCnt / totalCnt) * 100).toFixed(2));
				tempBus["category"] = "버스";

				tempTruck["time"] = moment(recordTime).format("HH:mm");
				tempTruck["value"] = parseFloat(
					((mTruckCnt / totalCnt) * 100).toFixed(2)
				);
				tempTruck["category"] = "화물차";

				tempMotor["time"] = moment(recordTime).format("HH:mm");
				tempMotor["value"] = parseFloat(
					((motorCnt / totalCnt) * 100).toFixed(2)
				);
				tempMotor["category"] = "오토바이";

				LaneData[laneNumber.toString()].push(tempCar);
				LaneData[laneNumber.toString()].push(tempBus);
				LaneData[laneNumber.toString()].push(tempTruck);
				LaneData[laneNumber.toString()].push(tempMotor);
			});
			setLaneData(LaneData);
			setData(LaneData[currentLaneNumber.toString()]);
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

export default VehicleRatio;
