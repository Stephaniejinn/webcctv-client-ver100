import React, { useEffect, useState } from "react";
import { Gauge } from "@ant-design/charts";
import { Spin } from "antd";

const AvgSpeedGauge = (props) => {
	const { isLoading, trafficData } = props;

	const [Data, setavgSpeed] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			setLoadingData(true);
			parseAvgData();
		}
	}, [isLoading, trafficData]);

	const parseAvgData = () => {
		var speedData = [0, 0, 0, 0];

		trafficData.forEach((data) => {
			const { carAvgSpeed, mBusAvgSpeed, mTruckAvgSpeed, motorAvgSpeed } = data;
			speedData[0] += parseFloat(carAvgSpeed);
			speedData[1] += parseFloat(mBusAvgSpeed);
			speedData[2] += parseFloat(mTruckAvgSpeed);
			speedData[3] += parseFloat(motorAvgSpeed);
		});

		const avgSpeedData = speedData.map((item) => item / trafficData.length);
		const GeneralAvgSpeed =
			(avgSpeedData[0] + avgSpeedData[1] + avgSpeedData[2] + avgSpeedData[3]) /
			4 /
			100;
		setavgSpeed(GeneralAvgSpeed);
		setLoadingData(false);
	};

	var config = {
		percent: Data,
		range: {
			ticks: [0, 1 / 3, 2 / 3, 1],
			color: ["#F4664A", "#FAAD14", "#30BF78"],
		},
		indicator: {
			pointer: { style: { stroke: "#D0D0D0", lineWidth: 2 } },
			// pin: { style: { stroke: '#D0D0D0', lineWidth:0.5 } },
			pin: null,
		},
		axis: {
			label: {
				formatter: function formatter(v) {
					return Number(v) * 100;
				},
				style: { fontSize: 10 },
			},
			// subTickLine: { count: 3 },
		},
		statistic: {
			content: {
				formatter: function formatter(_ref) {
					return (_ref.percent * 100).toFixed(2) + "km/h";
				},
				style: {
					fontSize: "14px",
					lineHeight: "30px",
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
				<Gauge {...config} />
			)}
		</>
	);
};

export default AvgSpeedGauge;
