import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";

const DLOverSpeed = (props) => {
	const {
		activeVisualKey,
		isLoadingOverSpeed,
		overSpeedData,

		totalData,
		setTotalData,
	} = props;

	const [Data, setData] = useState([]);

	var cntCar = [];
	var cntBus = [];
	var cntTruck = [];
	var cntMotor = [];
	var cntTotalData = [];

	useEffect(() => {
		if (activeVisualKey === "5") {
			if (isLoadingOverSpeed === false) {
				parseTotalData();
			}
		}
	}, [isLoadingOverSpeed]);

	const parseTotalData = () => {
		if (totalData.length !== 0) {
			console.log("count total has data");
			setData(totalData);
		} else {
			console.log("count count parse");
			overSpeedData.forEach((TrafficData) => {
				const {
					laneNumber,
					carSpdCnt,
					mBusSpdCnt,
					mTruckSpdCnt,
					motorSpdCnt,
				} = TrafficData;

				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};

				tempCar["laneNum"] = `${laneNumber.toString()} 차선`;
				tempCar["value"] = carSpdCnt;
				tempCar["type"] = "승용차";

				tempBus["laneNum"] = `${laneNumber.toString()} 차선`;
				tempBus["value"] = mBusSpdCnt;
				tempBus["type"] = "버스";

				tempTruck["laneNum"] = `${laneNumber.toString()} 차선`;
				tempTruck["value"] = mTruckSpdCnt;
				tempTruck["type"] = "화물차";

				tempMotor["laneNum"] = `${laneNumber.toString()} 차선`;
				tempMotor["value"] = motorSpdCnt;
				tempMotor["type"] = "오토바이";
				cntCar.push(tempCar);
				cntBus.push(tempBus);
				cntTruck.push(tempTruck);
				cntMotor.push(tempMotor);
			});
			cntTotalData = cntCar.concat(cntBus.concat(cntTruck.concat(cntMotor)));
			setTotalData(cntTotalData);
			setData(cntTotalData);
		}
	};

	var config = {
		data: Data,
		isStack: true,
		xField: "laneNum",
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
export default DLOverSpeed;
