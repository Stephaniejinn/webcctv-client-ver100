import React, { useEffect, useState } from "react";
import { Statistic } from "antd";

const Peak15 = (props) => {
	const {
		currentLaneNumber,
		activeVisualKey,
		isLoadingPeak,
		peakData,
		timeClassification,
	} = props;
	const [peak15, setPeakHour] = useState("");

	useEffect(() => {
		if (isLoadingPeak === false) {
			setPeakHour(peakData[0]["peak15Minute"].substring(12, 16));
		}
	}, [isLoadingPeak, peakData]);

	return currentLaneNumber === 0 ? (
		<Statistic title="첨두시간" value={peak15} />
	) : (
		<h1>차선별 데이터 없습니다</h1>
	);
};

export default Peak15;
