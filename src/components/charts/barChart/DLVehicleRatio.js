import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";

const VehicleRatio = (props) => {
	const {
		activeVisualKey,
		isLoadingTrafficTotal,
		trafficTotalData,
		totalData,
		setTotalData,
		timeClassification,
	} = props;

	const [Data, setData] = useState([]);

	var carRatio = [];
	var busRatio = [];
	var truckRatio = [];
	var motorRatio = [];
	var RatioTotalData = [];

	useEffect(() => {
		if (isLoadingTrafficTotal === false) {
			setTotalData([]);
			parseTotalData();
		}
	}, [trafficTotalData]);

	useEffect(() => {
		if (activeVisualKey === "3") {
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
				const totalCnt = carCnt + mBusCnt + mTruckCnt + motorCnt;

				const tempCar = {};
				const tempBus = {};
				const tempTruck = {};
				const tempMotor = {};

				tempCar["laneNum"] = `${laneNumber.toString()} 차선`;
				tempCar["value"] = parseFloat(((carCnt / totalCnt) * 100).toFixed(2));
				tempCar["type"] = "승용차";

				tempBus["laneNum"] = `${laneNumber.toString()} 차선`;
				tempBus["value"] = parseFloat(((mBusCnt / totalCnt) * 100).toFixed(2));
				tempBus["type"] = "버스";

				tempTruck["laneNum"] = `${laneNumber.toString()} 차선`;
				tempTruck["value"] = parseFloat(
					((mTruckCnt / totalCnt) * 100).toFixed(2)
				);
				tempTruck["type"] = "화물차";

				tempMotor["laneNum"] = `${laneNumber.toString()} 차선`;
				tempMotor["value"] = parseFloat(
					((motorCnt / totalCnt) * 100).toFixed(2)
				);
				tempMotor["type"] = "오토바이";

				carRatio.push(tempCar);
				busRatio.push(tempBus);
				truckRatio.push(tempTruck);
				motorRatio.push(tempMotor);
			});
			RatioTotalData = carRatio.concat(
				busRatio.concat(truckRatio.concat(motorRatio))
			);
			setTotalData(RatioTotalData);
			setData(RatioTotalData);
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
export default VehicleRatio;
