import React, { useEffect, useState } from "react";
import { Statistic } from "antd";

const PeakRatio = (props) => {
	const {
		currentLaneNumber,
		activeVisualKey,
		isLoadingPeak,
		peakData,
		timeClassification,
	} = props;
	const [peakRatio, setPeakHour] = useState("");

	useEffect(() => {
		if (isLoadingPeak === false) {
			var peakRatioVal =
				peakData[0]["peak15MinuteTotal"] / peakData[0]["total"];

			setPeakHour(peakData[0]["peak15MinuteTotal"].substring(12, 16));
		}
	}, [isLoadingPeak]);

	return currentLaneNumber === 0 ? (
		<Statistic title="첨두시간" value={peakRatio} />
	) : (
		<h1>차선별 데이터 없습니다</h1>
	);
};

export default PeakRatio;
