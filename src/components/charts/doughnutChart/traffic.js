import React, { useEffect, useState } from "react";
import axios from "axios";

import { Pie } from "@ant-design/charts";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const TrafficPie = (props) => {
	const { startDate, endTime, interval, cameraCode } = props;

	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/statistics/traffic?groupBy=time";
	// const group = timeClassification ? "time" : "lane";

	const [vehicleRatio, setVehicleRatio] = useState([]);

	useEffect(() => {
		asyncAxios();
	}, []);

	const asyncAxios = () => {
		// console.log("group", group);
		// console.log("startDate", startDate);
		// console.log("endTime", endTime);
		// console.log("interval", interval);
		// console.log("cameraCode", cameraCode);
		var vehicleRatioData = [
			{
				type: "승용차",
				value: 0,
			},
			{
				type: "버스",
				value: 0,
			},
			{
				type: "화물차",
				value: 0,
			},
			{
				type: "오토바이",
				value: 0,
			},
		];
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
					const { carCnt, mBusCnt, mTruckCnt, motorCnt } = TrafficData;
					vehicleRatioData[0].value += carCnt;
					vehicleRatioData[1].value += mBusCnt;
					vehicleRatioData[2].value += mTruckCnt;
					vehicleRatioData[3].value += motorCnt;
				});
				// console.log(vehicleRatioData);
				setVehicleRatio(vehicleRatioData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	var config = {
		appendPadding: 0,
		data: vehicleRatio,
		angleField: "value",
		colorField: "type",
		radius: 1,
		innerRadius: 0.46,
		legend: false,
		label: {
			type: "inner",
			offset: "-54%",
			content: "{value}대",
			autoRotate: false,

			style: {
				textAlign: "center",
				fontSize: 10,
			},
		},
		interactions: [{ type: "element-selected" }, { type: "element-active" }],
		statistic: {
			title: false,
			content: {
				style: {
					whiteSpace: "pre-wrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					fontSize: 14,
				},
				value: {
					formatter: function formatter(v) {
						return "".concat(v, "대");
					},
				},
			},
		},
	};
	return <Pie {...config} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(TrafficPie);
