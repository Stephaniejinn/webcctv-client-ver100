import React, { useEffect, useState } from "react";
import axios from "axios";
import { Gauge } from "@ant-design/charts";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const MyGauge = (props) => {
	const { startDate, endTime, interval, cameraCode } = props;
	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/statistics/traffic?groupBy=time";

	const [generalAvgSpeed, setGeneralAvgSpeed] = useState([]);

	useEffect(() => {
		asyncAxios();
	}, []);

	const asyncAxios = () => {
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
				const GeneralAvgSpeed =
					(avgSpeedData[0] +
						avgSpeedData[1] +
						avgSpeedData[2] +
						avgSpeedData[3]) /
					4 /
					100;
				setGeneralAvgSpeed(GeneralAvgSpeed);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	var config = {
		percent: generalAvgSpeed,
		range: {
			ticks: [0, 1 / 3, 2 / 3, 1],
			color: ["#F4664A", "#FAAD14", "#30BF78"],
		},
		indicator: {
			pointer: { style: { stroke: "#D0D0D0", lineWidth: 2 } },
			// pin: { style: { stroke: '#D0D0D0', lineWidth:0.5 } },
			pin: null,
		},
		axis: {
			label: {
				formatter: function formatter(v) {
					return Number(v) * 100;
				},
				style: { fontSize: 10 },
			},
			// subTickLine: { count: 3 },
		},
		statistic: {
			content: {
				formatter: function formatter(_ref) {
					return (_ref.percent * 100).toFixed(2) + "km/h";
				},
				style: {
					fontSize: "14px",
					lineHeight: "30px",
				},
			},
		},
	};
	return <Gauge {...config} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(MyGauge);
