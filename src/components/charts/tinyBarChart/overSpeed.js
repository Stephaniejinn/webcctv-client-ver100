import React, { useEffect, useState } from "react";
import { TinyColumn } from "@ant-design/charts";

const OverSpeedTinyColumn = (props) => {
	const { violationData, isLoading } = props;

	const [Data, setData] = useState([]);

	useEffect(() => {
		if (!isLoading) {
			parseViolationData();
		}
	}, [isLoading, violationData]);

	const parseViolationData = () => {
		var overSpeedData = [0, 0, 0, 0];
		violationData.forEach((data) => {
			const { carSpdCnt, mBusSpdCnt, mTruckSpdCnt, motorSpdCnt } = data;
			overSpeedData[0] += carSpdCnt;
			overSpeedData[1] += mBusSpdCnt;
			overSpeedData[2] += mTruckSpdCnt;
			overSpeedData[3] += motorSpdCnt;
		});

		setData(overSpeedData);
	};

	var customlabel = ["승용차", "버스", "화물차", "오토바이"];

	var config = {
		autoFit: true,
		data: Data,
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
							: _data$$data.y,
						"대"
					);
			},
		},
	};
	return <TinyColumn {...config} />;
};

export default OverSpeedTinyColumn;
