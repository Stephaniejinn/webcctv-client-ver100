import React, { useEffect, useState } from "react";
import { Liquid } from "@ant-design/charts";

const PeakRatio = (props) => {
	const {
		currentLaneNumber,
		activeVisualKey,
		isLoadingPeak,
		peakData,
		timeClassification,
	} = props;
	const [peakRatio, setPeakRatio] = useState(0);

	useEffect(() => {
		if (isLoadingPeak === false) {
			var peakRatioVal =
				peakData[0]["peak15MinuteTotal"] / peakData[0]["total"];

			setPeakRatio(peakRatioVal.toFixed(2));
			console.log(peakRatioVal.toFixed(2));
		}
	}, [isLoadingPeak, peakData]);

	var config = {
		percent: peakRatio,
		statistic: {
			title: {
				formatter: function formatter() {
					return "집중율";
				},
			},
			content: {
				style: {
					fontSize: 16,
					fill: "black",
				},
			},
		},
	};
	return currentLaneNumber === 0 ? (
		<Liquid {...config} />
	) : (
		<h1>차선별 데이터 없습니다</h1>
	);
};

export default PeakRatio;
