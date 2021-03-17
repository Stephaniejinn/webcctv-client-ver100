import React, { useEffect, useState } from "react";
import { TinyColumn } from "@ant-design/charts";
import { Spin } from "antd";

const AvgSpeedTinyColumn = (props) => {
	const { trafficData, isLoading } = props;

	const [avgSpeed, setAvgSpeed] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);

	useEffect(() => {
		if (!isLoading) {
			setLoadingData(true);
			parseTrafficData();
		}
	}, [isLoading, trafficData]);

	const parseTrafficData = () => {
		var speedData = [0, 0, 0, 0];
		trafficData.forEach((data) => {
			const { carAvgSpeed, mBusAvgSpeed, mTruckAvgSpeed, motorAvgSpeed } = data;
			speedData[0] += parseFloat(carAvgSpeed);
			speedData[1] += parseFloat(mBusAvgSpeed);
			speedData[2] += parseFloat(mTruckAvgSpeed);
			speedData[3] += parseFloat(motorAvgSpeed);
		});

		const avgSpeedData = speedData.map((item) => item / trafficData.length);
		setAvgSpeed(avgSpeedData);
		setLoadingData(false);
	};

	var customlabel = ["승용차", "버스", "화물차", "오토바이"];

	var config = {
		autoFit: true,
		data: avgSpeed,
		tooltip: {
			customContent: function customContent(x, data) {
				var label = "car";
				var _data$, _data$$data;
				if (x !== null) {
					label = customlabel[x];
				}
				return label
					.concat(": ")
					.concat(
						(_data$ = data[0]) === null || _data$ === void 0
							? void 0
							: (_data$$data = _data$.data) === null || _data$$data === void 0
							? void 0
							: _data$$data.y.toFixed(2),
						"km/h"
					);
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
				<TinyColumn {...config} />
			)}
		</>
	);
};

export default AvgSpeedTinyColumn;