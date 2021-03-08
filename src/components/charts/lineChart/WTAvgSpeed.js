import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";

const WTAvgSpeed = (props) => {
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
		if (activeVisualKey === "4") {
			if (isLoadingTrafficTotal === false && isLoadingTrafficLane === false) {
				console.log("trafficTotalData", trafficTotalData);
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
					carAvgSpeed,
					mBusAvgSpeed,
					mTruckAvgSpeed,
					motorAvgSpeed,
				} = TrafficData;
				let tempCar = {};
				let tempBus = {};
				let tempTruck = {};
				let tempMotor = {};

				tempCar["time"] = recordTime.substring(0, 10);
				tempCar["key"] = "승용차";
				tempCar["value"] = parseFloat(carAvgSpeed);

				tempBus["time"] = recordTime.substring(0, 10);
				tempBus["key"] = "버스";
				tempBus["value"] = parseFloat(mBusAvgSpeed);

				tempTruck["time"] = recordTime.substring(0, 10);
				tempTruck["key"] = "화물차";
				tempTruck["value"] = parseFloat(mTruckAvgSpeed);

				tempMotor["time"] = recordTime.substring(0, 10);
				tempMotor["key"] = "오토바이";
				tempMotor["value"] = parseFloat(motorAvgSpeed);
				TotalData.push(tempCar);
				TotalData.push(tempBus);
				TotalData.push(tempTruck);
				TotalData.push(tempMotor);
			});
			setTotalData(TotalData);
			console.log(TotalData);
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
					carCnt: carAvgSpeed,
					mBusCnt: mBusAvgSpeed,
					mTruckCnt: mTruckAvgSpeed,
					motorCnt: motorAvgSpeed,
				} = TrafficData;
				let tempCar = {};
				let tempBus = {};
				let tempTruck = {};
				let tempMotor = {};

				tempCar["time"] = recordTime.substring(0, 10);
				tempCar["key"] = "승용차";
				tempCar["value"] = parseFloat(carAvgSpeed);

				tempBus["time"] = recordTime.substring(0, 10);
				tempBus["key"] = "버스";
				tempBus["value"] = parseFloat(mBusAvgSpeed);

				tempTruck["time"] = recordTime.substring(0, 10);
				tempTruck["key"] = "화물차";
				tempTruck["value"] = parseFloat(mTruckAvgSpeed);

				tempMotor["time"] = recordTime.substring(0, 10);
				tempMotor["key"] = "오토바이";
				tempMotor["value"] = parseFloat(motorAvgSpeed);

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
		legend: false,
		seriesField: "key",
		stepType: "hvh",
	};
	return <Line {...config} />;
};
export default WTAvgSpeed;
