import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/charts";
import { Spin } from "antd";

const TrafficPie = (props) => {
	const { trafficData, isLoading } = props;
	const [Data, setVehicleRatio] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			setLoadingData(true);
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
		setLoadingData(false);
	};
	var config = {
		appendPadding: 0,
		data: Data,
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
	return (
		<>
			{isLoadingData ? (
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
				<Pie {...config} />
			)}
		</>
	);
};

export default TrafficPie;
