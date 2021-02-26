import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "@ant-design/charts";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const MyLine = (props) => {
	const {
		startDate,
		endTime,
		timeClassification,
		interval,
		cameraCode,
	} = props;
	const [data, setData] = useState([]);

	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/statistics/traffic?";
	const group = timeClassification ? "time" : "lane";

	var cntData = [];

	useEffect(() => {
		asyncAxios();
	}, []);

	const asyncAxios = () => {
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
						recordTime,
						carCnt,
						mBusCnt,
						mTruckCnt,
						motorCnt,
					} = TrafficData;
					const tempCar = {};
					const tempBus = {};
					const tempTruck = {};
					const tempMotor = {};
					tempCar["time"] = recordTime.substring(11, 16);
					tempCar["value"] = carCnt;
					tempCar["category"] = "승용차";

					tempBus["time"] = recordTime.substring(11, 16);
					tempBus["value"] = mBusCnt;
					tempBus["category"] = "버스";

					tempTruck["time"] = recordTime.substring(11, 16);
					tempTruck["value"] = mTruckCnt;
					tempTruck["category"] = "화물차";

					tempMotor["time"] = recordTime.substring(11, 16);
					tempMotor["value"] = motorCnt;
					tempMotor["category"] = "오토바이";
					cntData.push(tempCar);
					cntData.push(tempBus);
					cntData.push(tempTruck);
					cntData.push(tempMotor);
				});
				// console.log(vehicleRatioData);
				setData(cntData);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	var config = {
		data: data,
		xField: "time",
		yField: "value",
		seriesField: "category",
		// xAxis: { type: "time" },
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return "".concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
						return "".concat(s, ",");
					});
				},
			},
		},
	};
	return <Line {...config} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(MyLine);
