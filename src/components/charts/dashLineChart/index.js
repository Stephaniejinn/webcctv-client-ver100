import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const DashLine = (props) => {
	const {
		startDate,
		endTime,
		timeClassification,
		interval,
		cameraCode,
	} = props;

	const [DTPedestriansData, setDTPedestriansData] = useState([]);
	var DTPedestrians = [];

	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/statistics/pedestrians?";
	const group = timeClassification ? "time" : "lane";

	useEffect(() => {
		asyncFetch();
	}, []);
	const asyncFetch = () => {
		axios
			.get(
				// `${baseURL}${currentURL}&camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime}&interval=${interval}`,
				`${baseURL}${currentURL}camCode=0004&startDate=2020-05-04&endTime=2020-05-04 23:59:59&interval=15M&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				res.data.forEach((pedestrianData) => {
					const { recordTime, pedestrianCnt, jaywalkCnt } = pedestrianData;
					const totalTemp = {};
					const personTemp = {};
					const jaywalkTemp = {};
					const timeTemp = recordTime.substring(11, 16);
					const personCnt = pedestrianCnt - jaywalkCnt;
					totalTemp["date"] = timeTemp;
					totalTemp["type"] = "총 보행자";
					totalTemp["value"] = pedestrianCnt;

					personTemp["date"] = timeTemp;
					personTemp["type"] = "보행자";
					personTemp["value"] = personCnt;

					jaywalkTemp["date"] = timeTemp;
					jaywalkTemp["type"] = "무단횡단";
					jaywalkTemp["value"] = jaywalkCnt;
					DTPedestrians.push(personTemp);
					DTPedestrians.push(totalTemp);
					DTPedestrians.push(jaywalkTemp);
				});
				// console.log(vehicleRatioData);
				setDTPedestriansData(DTPedestrians);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	var config = {
		data: DTPedestriansData,
		xField: "date",
		yField: "value",
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
				},
			},
		},
		seriesField: "type",
		color: function color(_ref) {
			var type = _ref.type;
			return type === "총 보행자"
				? "#F4664A"
				: type === "보행자"
				? "#30BF78"
				: "#FAAD14";
		},
		lineStyle: function lineStyle(_ref2) {
			var type = _ref2.type;
			if (type === "총 보행자") {
				return {
					lineDash: [4, 4],
					opacity: 1,
				};
			}
			return { opacity: 0.5 };
		},
	};
	return <Line {...config} />;
};
export default DashLine;
