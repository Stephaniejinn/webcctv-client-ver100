import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";

const PCU = (props) => {
	const {
		activeVisualKey,
		isLoadingTrafficTotal,
		trafficTotalData,

		totalData,
		setTotalData,
		laneData,
		setLaneData,

		timeClassification,
	} = props;

	const [Data, setData] = useState([]);

	var PCUCar = [];
	var PCUBus = [];
	var PCUTruck = [];
	var PCUMotor = [];
	var PCUTotalData = [];

	useEffect(() => {
		if (activeVisualKey === "2") {
			if (isLoadingTrafficTotal === false) {
				parseTotalData();
			}
		}
	}, [isLoadingTrafficTotal]);

	const parseTotalData = () => {
		if (totalData.length !== 0) {
			console.log("count total has data");
			setData(totalData);
		} else {
			console.log("count count parse");
			trafficTotalData.forEach((TrafficData) => {
				const {
					laneNumber,
					carCnt,
					mBusCnt,
					mTruckCnt,
					motorCnt,
				} = TrafficData;
				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};

				tempCar["laneNum"] = `${laneNumber.toString()} 차선`;
				tempCar["value"] = carCnt;
				tempCar["type"] = "승용차";

				tempBus["laneNum"] = `${laneNumber.toString()} 차선`;
				tempBus["value"] = mBusCnt * 1.8;
				tempBus["type"] = "버스";

				tempTruck["laneNum"] = `${laneNumber.toString()} 차선`;
				tempTruck["value"] = mTruckCnt * 1.8;
				tempTruck["type"] = "화물차";

				tempMotor["laneNum"] = `${laneNumber.toString()} 차선`;
				tempMotor["value"] = motorCnt;
				tempMotor["type"] = "오토바이";
				PCUCar.push(tempCar);
				PCUBus.push(tempBus);
				PCUTruck.push(tempTruck);
				PCUMotor.push(tempMotor);
			});
			PCUTotalData = PCUCar.concat(PCUBus.concat(PCUTruck.concat(PCUMotor)));
			console.log(PCUTotalData);
			setTotalData(PCUTotalData);
			setData(PCUTotalData);
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
export default PCU;
