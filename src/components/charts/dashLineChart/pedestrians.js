import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

const DashLine = (props) => {
	const {
		currentLaneNumber,
		activeVisualKey,
		isLoadingPedestrians,
		pedestriansData,
		timeClassification,
	} = props;

	const [DTPedestriansData, setDTPedestriansData] = useState([]);
	var DTPedestrians = [];

	// const group = timeClassification ? "time" : "lane";

	useEffect(() => {
		if (activeVisualKey === "11") {
			if (!isLoadingPedestrians) {
				Parse();
			}
		}
	}, [isLoadingPedestrians, pedestriansData, activeVisualKey]);

	const Parse = () => {
		pedestriansData.forEach((pedestrianData) => {
			const { recordTime, pedestrianCnt, jaywalkCnt } = pedestrianData;
			const totalTemp = {};
			const personTemp = {};
			const jaywalkTemp = {};
			const timeTemp = moment(recordTime).format("HH:mm");
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
	return currentLaneNumber === 0 ? (
		<Line {...config} />
	) : (
		<h1>차선별 데이터 없습니다</h1>
	);
};
export default DashLine;
