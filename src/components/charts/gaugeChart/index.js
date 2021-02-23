import React from "react";
import { Gauge } from "@ant-design/charts";

const MyGauge = (props) => {
	const {
		startDate,
		endTime,
		timeClassification,
		interval,
		cameraCode,
		resData,
	} = props;

	var config = {
		percent: 0.75,
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
				style: { fontSize: 11 },
			},
			// subTickLine: { count: 3 },
		},
		statistic: {
			content: {
				style: {
					fontSize: "16spx",
					lineHeight: "20px",
				},
			},
		},
	};
	return <Gauge {...config} />;
};
export default MyGauge;
