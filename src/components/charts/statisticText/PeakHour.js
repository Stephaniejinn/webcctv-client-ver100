import React, { useEffect, useState } from "react";
import { Statistic } from "antd";

const PeakHour = (props) => {
	const {
		currentLaneNumber,
		activeVisualKey,
		isLoadingPeak,
		peakData,
		timeClassification,
	} = props;
	const [peakHour, setPeakHour] = useState(0);

	useEffect(() => {
		if (isLoadingPeak === false) {
			setPeakHour(peakData[0]["peak15MinuteTotal"] * 4);
		}
	}, [isLoadingPeak, peakData]);

	return currentLaneNumber === 0 ? (
		<Statistic title="첨두유율" value={peakHour} />
	) : (
		<h1>차선별 데이터 없습니다</h1>
	);
};

export default PeakHour;
