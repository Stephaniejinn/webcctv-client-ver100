import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";

const LaneCnt = (props) => {
	const { activeVisualKey, trafficTotalData } = props;

	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	var cntCar = [];
	var cntBus = [];
	var cntTruck = [];
	var cntMotor = [];
	var cntTotalData = [];

	useEffect(() => {
		if (activeVisualKey === "1") {
			setLoading(true);
			parseTotalData();
		}
	}, [trafficTotalData, activeVisualKey]);

	const parseTotalData = () => {
		console.log("count 일간 차선별 통행량 parse");
		trafficTotalData.slice(1).forEach((TrafficData) => {
			const {
				laneNumber,
				carVolume,
				mBusVolume,
				mTruckVolume,
				motorVolume,
			} = TrafficData;

			const tempCar = {};
			const tempBus = {};
			const tempTruck = {};
			const tempMotor = {};

			tempCar["laneNum"] = `${laneNumber.toString()} 차선`;
			tempCar["value"] = carVolume;
			tempCar["type"] = "승용차";

			tempBus["laneNum"] = `${laneNumber.toString()} 차선`;
			tempBus["value"] = mBusVolume;
			tempBus["type"] = "버스";

			tempTruck["laneNum"] = `${laneNumber.toString()} 차선`;
			tempTruck["value"] = mTruckVolume;
			tempTruck["type"] = "화물차";

			tempMotor["laneNum"] = `${laneNumber.toString()} 차선`;
			tempMotor["value"] = motorVolume;
			tempMotor["type"] = "오토바이";

			cntCar.push(tempCar);
			cntBus.push(tempBus);
			cntTruck.push(tempTruck);
			cntMotor.push(tempMotor);
		});
		cntTotalData = cntCar.concat(cntBus.concat(cntTruck.concat(cntMotor)));
		setData(cntTotalData);
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
export default LaneCnt;
