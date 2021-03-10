import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";

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

	var carRatio = [];
	var busRatio = [];
	var truckRatio = [];
	var motorRatio = [];
	var TotalData = [];
	var LaneData = {};

	useEffect(() => {
		if (activeVisualKey === "3") {
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

				const totalCnt = carCnt + mBusCnt + mTruckCnt + motorCnt;

				tempCar["time"] = recordTime.substring(11, 16);
				tempCar["value"] = parseFloat(((carCnt / totalCnt) * 100).toFixed(2));
				tempCar["type"] = "승용차";

				tempBus["time"] = recordTime.substring(11, 16);
				tempBus["value"] = parseFloat(((mBusCnt / totalCnt) * 100).toFixed(2));
				tempBus["type"] = "버스";

				tempTruck["time"] = recordTime.substring(11, 16);
				tempTruck["value"] = parseFloat(
					((mTruckCnt / totalCnt) * 100).toFixed(2)
				);
				tempTruck["type"] = "화물차";

				tempMotor["time"] = recordTime.substring(11, 16);
				tempMotor["value"] = parseFloat(
					((motorCnt / totalCnt) * 100).toFixed(2)
				);
				tempMotor["type"] = "오토바이";

				carRatio.push(tempCar);
				busRatio.push(tempBus);
				truckRatio.push(tempTruck);
				motorRatio.push(tempMotor);
			});
			TotalData = carRatio.concat(
				busRatio.concat(truckRatio.concat(motorRatio))
			);
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

				tempCar["time"] = recordTime.substring(11, 16);
				tempCar["value"] = parseFloat(((carCnt / totalCnt) * 100).toFixed(2));
				tempCar["category"] = "승용차";

				tempBus["time"] = recordTime.substring(11, 16);
				tempBus["value"] = parseFloat(((mBusCnt / totalCnt) * 100).toFixed(2));
				tempBus["category"] = "버스";

				tempTruck["time"] = recordTime.substring(11, 16);
				tempTruck["value"] = parseFloat(
					((mTruckCnt / totalCnt) * 100).toFixed(2)
				);
				tempTruck["category"] = "화물차";

				tempMotor["time"] = recordTime.substring(11, 16);
				tempMotor["value"] = parseFloat(
					((motorCnt / totalCnt) * 100).toFixed(2)
				);
				tempMotor["category"] = "오토바이";

				carRatio.push(tempCar);
				busRatio.push(tempBus);
				truckRatio.push(tempTruck);
				motorRatio.push(tempMotor);
				// TotalData = carRatio.concat(
				//   busRatio.concat(truckRatio.concat(motorRatio))
				// );
				// LaneData[laneNumber.toString()].push(carRatio.concat(
				//     busRatio.concat(truckRatio.concat(motorRatio))
				//   ));
				// LaneData[laneNumber.toString()].push(tempBus);
				// LaneData[laneNumber.toString()].push(tempTruck);
				// LaneData[laneNumber.toString()].push(tempMotor);
			});
			setLaneData(LaneData);
			setData(LaneData[currentLaneNumber.toString()]);
		}
	};
	var config = {
		data: Data,
		isStack: true,
		xField: "time",
		yField: "value",
		seriesField: "type",
		label: {
			position: "middle",
			layout: [
				{ type: "interval-adjust-position" },
				{ type: "interval-hide-overlap" },
				{ type: "adjust-color" },
			],
		},
	};
	return <Column {...config} />;
};
export default VehicleRatio;
