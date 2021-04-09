import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/charts";
import { Spin } from "antd";

const VehicleRatio = (props) => {
	const { trafficData } = props;
	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);

	useEffect(() => {
		setLoadingData(true);
		setData([]);

		parseTraffic();
	}, [trafficData]);

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
		vehicleRatioData[0].value = trafficData[0]["carVolume"];
		vehicleRatioData[1].value = trafficData[0]["mBusVolume"];
		vehicleRatioData[2].value = trafficData[0]["mTruckVolume"];
		vehicleRatioData[3].value = trafficData[0]["motorVolume"];
		setData(vehicleRatioData);
		setLoadingData(false);
	};
	var config = {
		appendPadding: 0,
		data: Data,
		angleField: "value",
		colorField: "type",
		radius: 1,
		innerRadius: 0.46,
		legend: true,
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

export default VehicleRatio;
