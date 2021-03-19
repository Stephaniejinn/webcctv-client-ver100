import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

const LaneAvgSpeedLine = (props) => {
	const {
		activeVisualKey,
		isLoadingTrafficTotal,
		trafficTotalData,
		totalData,
		setTotalData,
		timeClassification,
	} = props;

	const [Data, setData] = useState([]);

	var avgSpeedTotalData = [];

	useEffect(() => {
		if (isLoadingTrafficTotal === false) {
			setTotalData([]);
			parseTotalData();
		}
	}, [trafficTotalData]);

	useEffect(() => {
		if (activeVisualKey === "4") {
			if (isLoadingTrafficTotal === false) {
				parseTotalData();
			}
		}
	}, [isLoadingTrafficTotal, activeVisualKey]);

	const parseTotalData = () => {
		if (totalData.length !== 0) {
			console.log("avg speed has total data");
			setData(totalData);
		} else {
			console.log("count over speed parse");
			trafficTotalData.forEach((TrafficData) => {
				const {
					laneNumber,
					carAvgSpeed,
					mBusAvgSpeed,
					mTruckAvgSpeed,
					motorAvgSpeed,
				} = TrafficData;

				let tempCar = {};
				let tempBus = {};
				let tempTruck = {};
				let tempMotor = {};

				tempCar["lane"] = `${laneNumber.toString()} 차선`;
				tempCar["value"] = parseFloat(carAvgSpeed);
				tempCar["category"] = "승용차";

				tempBus["lane"] = `${laneNumber.toString()} 차선`;
				tempBus["value"] = parseFloat(mBusAvgSpeed);
				tempBus["category"] = "버스";

				tempTruck["lane"] = `${laneNumber.toString()} 차선`;
				tempTruck["value"] = parseFloat(mTruckAvgSpeed);
				tempTruck["category"] = "화물차";

				tempMotor["lane"] = `${laneNumber.toString()} 차선`;
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

	var config = {
		data: Data,
		xField: "lane",
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
