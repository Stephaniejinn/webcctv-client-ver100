import React, { useEffect, useState } from "react";
import { TinyColumn } from "@ant-design/charts";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const MyTinyColumn = (props) => {
	const { startDate, endTime, interval, cameraCode } = props;

	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/statistics/traffic?groupBy=time";

	const [avgSpeed, setAvgSpeed] = useState([]);

	useEffect(() => {
		asyncAxios();
	}, []);

	const asyncAxios = () => {
		// console.log("group", group);
		// console.log("startDate", startDate);
		// console.log("endTime", endTime);
		// console.log("interval", interval);
		// console.log("cameraCode", cameraCode);

		var speedData = [0, 0, 0, 0];
		axios
			.get(
				// `${baseURL}${currentURL}&camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime}&interval=${interval}`,
				`${baseURL}${currentURL}&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59&interval=15M&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				res.data.forEach((TrafficData) => {
					const {
						carAvgSpeed,
						mBusAvgSpeed,
						mTruckAvgSpeed,
						motorAvgSpeed,
					} = TrafficData;
					speedData[0] += parseFloat(carAvgSpeed);
					speedData[1] += parseFloat(mBusAvgSpeed);
					speedData[2] += parseFloat(mTruckAvgSpeed);
					speedData[3] += parseFloat(motorAvgSpeed);
				});

				const avgSpeedData = speedData.map((item) => item / res.data.length);
				setAvgSpeed(avgSpeedData);
			})
			.catch((err) => {
				console.log(err);
			});
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
					.concat(x, ": ")
					.concat(
						(_data$ = data[0]) === null || _data$ === void 0
							? void 0
							: (_data$$data = _data$.data) === null || _data$$data === void 0
							? void 0
							: _data$$data.y.toFixed(2)
					);
			},
		},
	};
	return <TinyColumn {...config} />;
};

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationCodeInfo: () => {
			dispatch(actions.getLocationCode());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MyTinyColumn);
