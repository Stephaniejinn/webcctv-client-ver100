import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";

const WTOverSpeed = (props) => {
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
	} = props;

	const [Data, setData] = useState([]);

	var TotalData = [];
	var LaneData = {};
	for (let idx = 1; idx <= totalLaneNumber; idx++) {
		LaneData[idx.toString()] = [];
	}

	useEffect(() => {
		if (activeVisualKey === "5") {
			if (
				isLoadingOverSpeedTotal === false &&
				isLoadingOverSpeedLane === false
			) {
				// console.log("trafficTotalData", overSpeedTotalData);
				console.log("overSpeedLaneData", overSpeedLaneData);

				currentLaneNumber === 0 ? parseTotalData() : parseLaneData();
			}
		}
	}, [
		currentLaneNumber,
		activeVisualKey,
		isLoadingOverSpeedTotal,
		isLoadingOverSpeedLane,
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
				let tempCar = {};
				let tempBus = {};
				let tempTruck = {};
				let tempMotor = {};

				tempCar["time"] = recordTime.substring(0, 10);
				tempCar["key"] = "승용차";
				tempCar["value"] = carSpdCnt;

				tempBus["time"] = recordTime.substring(0, 10);
				tempBus["key"] = "버스";
				tempBus["value"] = mBusSpdCnt;

				tempTruck["time"] = recordTime.substring(0, 10);
				tempTruck["key"] = "화물차";
				tempTruck["value"] = mTruckSpdCnt;

				tempMotor["time"] = recordTime.substring(0, 10);
				tempMotor["key"] = "오토바이";
				tempMotor["value"] = motorSpdCnt;

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
			overSpeedLaneData.forEach((TrafficData) => {
				const {
					laneNumber,
					recordTime,
					carSpdCnt,
					mBusSpdCnt,
					mTruckSpdCnt,
					motorSpdCnt,
				} = TrafficData;
				let tempCar = {};
				let tempBus = {};
				let tempTruck = {};
				let tempMotor = {};

				tempCar["time"] = recordTime.substring(0, 10);
				tempCar["key"] = "승용차";
				tempCar["value"] = carSpdCnt;

				tempBus["time"] = recordTime.substring(0, 10);
				tempBus["key"] = "버스";
				tempBus["value"] = mBusSpdCnt;

				tempTruck["time"] = recordTime.substring(0, 10);
				tempTruck["key"] = "화물차";
				tempTruck["value"] = mTruckSpdCnt;

				tempMotor["time"] = recordTime.substring(0, 10);
				tempMotor["key"] = "오토바이";
				tempMotor["value"] = motorSpdCnt;

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
export default WTOverSpeed;
