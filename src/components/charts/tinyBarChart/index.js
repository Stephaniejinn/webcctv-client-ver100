import React, { useEffect, useState } from "react";
import { TinyColumn } from "@ant-design/charts";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const MyTinyColumn = (props) => {
	const {
		startDate,
		endTime,
		timeClassification,
		interval,
		cameraCode,
	} = props;

	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/statistics/traffic?";
	const group = timeClassification ? "time" : "lane";

	const [avgSpeed, setAvgSpeed] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		console.log("group", group);
		console.log("startDate", startDate);
		console.log("endTime", endTime);
		console.log("interval", interval);
		console.log("cameraCode", cameraCode);

		var avgSpeedData = [0, 0, 0, 0];
		axios
			.get(
				// `${baseURL}${currentURL}groupBy=${group}&camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime}&interval=${interval}`,
				`${baseURL}${currentURL}groupBy=${group}&camCode=0004&startDate=2020-09-28&endTime=2020-09-28 23:59:59&interval=15M&limit=0&offset=0`,
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
					avgSpeedData[0] += carAvgSpeed;
					avgSpeedData[1] += mBusAvgSpeed;
					avgSpeedData[2] += mTruckAvgSpeed;
					avgSpeedData[3] += motorAvgSpeed;
				});

				avgSpeedData.map((item) => item / res.data.length);
				console.log(avgSpeedData);
				setAvgSpeed(avgSpeedData);
			})
			// console.log(vehicleRatioData);
			.catch((err) => {
				console.log(err);
			});
	};

	// var avgSpeed = [274, 337, 81, 497];
	var config = {
		autoFit: true,
		data: avgSpeed,
		tooltip: {
			customContent: function customContent(x, data) {
				var _data$, _data$$data;
				return "NO."
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
