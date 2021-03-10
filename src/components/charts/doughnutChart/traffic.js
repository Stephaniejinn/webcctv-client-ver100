import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/charts";

const TrafficPie = (props) => {
	const { trafficData, isLoading } = props;
	const [vehicleRatio, setVehicleRatio] = useState([]);

	useEffect(() => {
		if (!isLoading) {
			parseTraffic();
		}
	}, [isLoading, trafficData]);

	const parseTraffic = () => {
		var vehicleRatioData = [
			{
				type: "승용차",
				value: 0,
			},
			{
				type: "버스",
				value: 0,
			},
			{
				type: "화물차",
				value: 0,
			},
			{
				type: "오토바이",
				value: 0,
			},
		];

		trafficData.forEach((data) => {
			const { carCnt, mBusCnt, mTruckCnt, motorCnt } = data;
			vehicleRatioData[0].value += carCnt;
			vehicleRatioData[1].value += mBusCnt;
			vehicleRatioData[2].value += mTruckCnt;
			vehicleRatioData[3].value += motorCnt;
		});
		// console.log("vehicleRatioData", vehicleRatioData);
		setVehicleRatio(vehicleRatioData);
	};
	var config = {
		appendPadding: 0,
		data: vehicleRatio,
		angleField: "value",
		colorField: "type",
		radius: 1,
		innerRadius: 0.46,
		legend: false,
		label: {
			type: "inner",
			offset: "-54%",
			content: "{value}대",
			autoRotate: false,

			style: {
				textAlign: "center",
				fontSize: 10,
			},
		},
		interactions: [{ type: "element-selected" }, { type: "element-active" }],
		statistic: {
			title: false,
			content: {
				style: {
					whiteSpace: "pre-wrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					fontSize: 14,
				},
				value: {
					formatter: function formatter(v) {
						return "".concat(v, "대");
					},
				},
			},
		},
	};
	return <Pie {...config} />;
};

export default TrafficPie;
