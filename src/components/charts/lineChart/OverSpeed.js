import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "@ant-design/charts";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const OverSpeedLine = (props) => {
	const {
		currentLaneNumber,
		totalLaneNumber,
		isLoadingData,
		setLoadingData,
		totalData,
		setTotalData,
		laneData,
		setLaneData,
		startDate,
		endTime,
		timeClassification,
		interval,
		cameraCode,
	} = props;

	const [Data, setData] = useState([]);

	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/statistics/traffic?";
	const group = timeClassification ? "time" : "lane";
	let overSpeedTotalData = [];
	let overSpeedLaneData = {};

	for (let idx = 1; idx <= totalLaneNumber; idx++) {
		overSpeedLaneData[idx.toString()] = [];
	}
	// console.log("current lane Number", currentLaneNumber);

	useEffect(() => {
		console.log("current lane Number, check effect", currentLaneNumber);
		currentLaneNumber === 0 ? asyncAxios() : asyncAxiosLane();
	}, []);

	const asyncAxios = () => {
		if (totalData.length !== 0) {
			console.log("over speed has total data");
			setData(totalData);
		} else {
			console.log("total data", totalData);
			console.log("count over speed axios");

			axios
				.get(
					// `${baseURL}${currentURL}groupBy=${group}&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59&interval=15M&limit=0&offset=0`,
					`${baseURL}${currentURL}groupBy=${group}&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59&interval=15M&limit=0&offset=0`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
							Cache: "No-cache",
						},
					}
				)
				.then((res) => {
					res.data.forEach((TrafficData) => {
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
						tempCar["time"] = recordTime.substring(11, 16);
						tempCar["value"] = parseFloat(carAvgSpeed);
						tempCar["category"] = "승용차";

						tempBus["time"] = recordTime.substring(11, 16);
						tempBus["value"] = parseFloat(mBusAvgSpeed);
						tempBus["category"] = "버스";

						tempTruck["time"] = recordTime.substring(11, 16);
						tempTruck["value"] = parseFloat(mTruckAvgSpeed);
						tempTruck["category"] = "화물차";

						tempMotor["time"] = recordTime.substring(11, 16);
						tempMotor["value"] = parseFloat(motorAvgSpeed);
						tempMotor["category"] = "오토바이";

						overSpeedTotalData.push(tempCar);
						overSpeedTotalData.push(tempBus);
						overSpeedTotalData.push(tempTruck);
						overSpeedTotalData.push(tempMotor);
					});
					setTotalData(overSpeedTotalData);
					setData(overSpeedTotalData);
					console.log(isLoadingData);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const asyncAxiosLane = () => {
		if (!isLoadingData) {
			console.log("over speed has lane data");

			setData(laneData[currentLaneNumber.toString()]);
		} else {
			console.log("count over speed axios lane");
			axios
				.get(
					// `${baseURL}${currentURL}groupBy=${group}&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59&interval=15M&limit=0&offset=0`,
					`${baseURL}${currentURL}groupBy=none&camCode=0004&startDate=2020-08-03&endTime=2020-08-03 23:59:59&interval=15M&limit=0&offset=0`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
							Cache: "No-cache",
						},
					}
				)
				.then((res) => {
					res.data.forEach((TrafficData) => {
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
						tempCar["time"] = recordTime.substring(11, 16);
						tempCar["value"] = parseFloat(carAvgSpeed);
						tempCar["category"] = "승용차";

						tempBus["time"] = recordTime.substring(11, 16);
						tempBus["value"] = parseFloat(mBusAvgSpeed);
						tempBus["category"] = "버스";

						tempTruck["time"] = recordTime.substring(11, 16);
						tempTruck["value"] = parseFloat(mTruckAvgSpeed);
						tempTruck["category"] = "화물차";

						tempMotor["time"] = recordTime.substring(11, 16);
						tempMotor["value"] = parseFloat(motorAvgSpeed);
						tempMotor["category"] = "오토바이";

						overSpeedLaneData[laneNumber.toString()].push(tempCar);
						overSpeedLaneData[laneNumber.toString()].push(tempBus);
						overSpeedLaneData[laneNumber.toString()].push(tempTruck);
						overSpeedLaneData[laneNumber.toString()].push(tempMotor);
					});
					setLaneData(overSpeedLaneData);
					setData(overSpeedLaneData[currentLaneNumber.toString()]);
					setLoadingData(false);
				})
				.catch((err) => {
					console.log(err);
				});
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

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationCodeInfo: () => {
			dispatch(actions.getLocationCode());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(OverSpeedLine);
