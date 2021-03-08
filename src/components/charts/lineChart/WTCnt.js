import React, { useEffect, useState } from "react";
import { Line } from "@ant-design/charts";

const WTCnt = (props) => {
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

	var cntTotalData = [];
	var cntLaneData = {};
	for (let idx = 1; idx <= totalLaneNumber; idx++) {
		cntLaneData[idx.toString()] = [];
	}

	useEffect(() => {
		if (activeVisualKey === "1") {
			if (isLoadingTrafficTotal === false && isLoadingTrafficLane === false) {
				// console.log("trafficTotalData", trafficTotalData);
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
				tempCar["time"] = recordTime.substring(0, 10);
				tempCar["key"] = "승용차";
				tempCar["value"] = carCnt;

				tempBus["time"] = recordTime.substring(0, 10);
				tempBus["key"] = "버스";
				tempBus["value"] = mBusCnt;

				tempTruck["time"] = recordTime.substring(0, 10);
				tempTruck["key"] = "화물차";
				tempTruck["value"] = mTruckCnt;

				tempMotor["time"] = recordTime.substring(0, 10);
				tempMotor["key"] = "오토바이";
				tempMotor["value"] = motorCnt;

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
				let tempCar = {};
				let tempBus = {};
				let tempTruck = {};
				let tempMotor = {};
				tempCar["time"] = recordTime.substring(0, 10);
				tempCar["key"] = "승용차";
				tempCar["value"] = carCnt;

				tempBus["time"] = recordTime.substring(0, 10);
				tempBus["key"] = "버스";
				tempBus["value"] = mBusCnt;

				tempTruck["time"] = recordTime.substring(0, 10);
				tempTruck["key"] = "화물차";
				tempTruck["value"] = mTruckCnt;

				tempMotor["time"] = recordTime.substring(0, 10);
				tempMotor["key"] = "오토바이";
				tempMotor["value"] = motorCnt;

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
		legend: false,
		seriesField: "key",
		stepType: "hvh",
	};
	return <Line {...config} />;
};
export default WTCnt;
