import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";

const VehicleRatio = (props) => {
	const { activeVisualKey, trafficTotalData } = props;
	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	var carRatio = [];
	var busRatio = [];
	var truckRatio = [];
	var motorRatio = [];
	var RatioTotalData = [];

	useEffect(() => {
		if (activeVisualKey === "3") {
			setLoading(true);
			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		console.log("count 일간 차선별 차종비율 parse");
		trafficTotalData.slice(1).forEach((TrafficData) => {
			const {
				laneNumber,
				carVehicleRatio,
				mBusVehicleRatio,
				mTruckVehicleRatio,
				motorVehicleRatio,
			} = TrafficData;

			const tempCar = {};
			const tempBus = {};
			const tempTruck = {};
			const tempMotor = {};

			tempCar["laneNum"] = `${laneNumber.toString()} 차선`;
			tempCar["value"] = parseFloat((carVehicleRatio * 100).toFixed(2));
			tempCar["type"] = "승용차";

			tempBus["laneNum"] = `${laneNumber.toString()} 차선`;
			tempBus["value"] = parseFloat((mBusVehicleRatio * 100).toFixed(2));
			tempBus["type"] = "버스";

			tempTruck["laneNum"] = `${laneNumber.toString()} 차선`;
			tempTruck["value"] = parseFloat((mTruckVehicleRatio * 100).toFixed(2));
			tempTruck["type"] = "화물차";

			tempMotor["laneNum"] = `${laneNumber.toString()} 차선`;
			tempMotor["value"] = parseFloat((motorVehicleRatio * 100).toFixed(2));
			tempMotor["type"] = "오토바이";

			carRatio.push(tempCar);
			busRatio.push(tempBus);
			truckRatio.push(tempTruck);
			motorRatio.push(tempMotor);
		});
		RatioTotalData = carRatio.concat(
			busRatio.concat(truckRatio.concat(motorRatio))
		);
		setData(RatioTotalData);
		setLoading(false);
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
	return (
		<>
			{isLoading ? (
				<div
					style={{
						marginTop: 20,
						marginBottom: 20,
						textAlign: "center",
						paddingTop: 30,
						paddingBottom: 30,
					}}
				>
					<Spin size="large" />
				</div>
			) : (
				<Column {...config} />
			)}
		</>
	);
};
export default VehicleRatio;
