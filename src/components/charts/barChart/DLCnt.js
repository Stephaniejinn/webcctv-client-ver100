import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";

const LaneCnt = (props) => {
	const {
		activeVisualKey,
		isLoadingTrafficTotal,
		trafficTotalData,

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
		if (isLoadingTrafficTotal === false) {
			setTotalData([]);
			parseTotalData();
		}
	}, [trafficTotalData]);

	useEffect(() => {
		if (activeVisualKey === "1") {
			if (isLoadingTrafficTotal === false) {
				parseTotalData();
			}
		}
	}, [isLoadingTrafficTotal, activeVisualKey]);

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
				tempBus["value"] = mBusCnt;
				tempBus["type"] = "버스";

				tempTruck["laneNum"] = `${laneNumber.toString()} 차선`;
				tempTruck["value"] = mTruckCnt;
				tempTruck["type"] = "화물차";

				tempMotor["laneNum"] = `${laneNumber.toString()} 차선`;
				tempMotor["value"] = motorCnt;
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
export default LaneCnt;
