import React, { useEffect, useState } from "react";
import { Statistic } from "antd";

const PHF = (props) => {
	const {
		currentLaneNumber,
		activeVisualKey,
		isLoadingPeak,
		peakData,
		timeClassification,
	} = props;
	const [PHF, setPHF] = useState("");
	useEffect(() => {
		if (isLoadingPeak === false) {
			var PHFVal =
				peakData[0]["peakHourTotal"] / (peakData[0]["peak15MinuteTotal"] * 4);

			setPHF(PHFVal.toFixed(2));
		}
	}, [isLoadingPeak, peakData]);

	return currentLaneNumber === 0 ? (
		<Statistic title="PHF" value={PHF} />
	) : (
		<h1>차선별 데이터 없습니다</h1>
	);
};

export default PHF;
