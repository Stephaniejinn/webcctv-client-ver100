import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import "./style.less";

const DTOverSpeedTable = (props) => {
	const { startDate, endTime, cameraCode, baseURL } = props;

	const [Data, setData] = useState([]);

	var TotalData = [];

	useEffect(() => {
		axiosData();
	}, [startDate, endTime, cameraCode]);

	const columns = [
		{
			title: "시간",
			dataIndex: "time",
		},
		{
			title: "차량번호",
			dataIndex: "licenseNumber",
		},
		{
			title: "위반속도(km/h)",
			dataIndex: "speed",
		},
		{
			title: "차종",
			dataIndex: "vehicleType",
		},
		{
			title: "이미지",
			dataIndex: "imageLink",
		},
	];

	const axiosData = () => {
		console.log(startDate, endTime);
		axios
			.get(
				`${baseURL}/violations/speeding/records?camCode=0004&startDate=${startDate}&endTime=${endTime} 23:59:59&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				console.log("count table axios");
				res.data.forEach((eachData, index) => {
					const {
						recordTime,
						vehicleType,
						licenseNumber,
						speed,
						imageLink,
					} = eachData;
					let dataTemp = {};
					dataTemp["key"] = index;
					if (startDate !== endTime) {
						dataTemp["time"] = moment(recordTime).format(
							"YYYY년 MM월 DD일 HH:mm:ss"
						);
					} else {
						dataTemp["time"] = moment(recordTime).format("HH:mm:ss");
					}
					dataTemp["vehicleType"] = vehicleType;
					dataTemp["licenseNumber"] = licenseNumber;
					dataTemp["speed"] = speed;
					dataTemp["imageLink"] = imageLink;
					TotalData.push(dataTemp);
				});
				setData(TotalData);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		// <>
		// 	{currentLaneNum === 0 ? (
		<Table columns={columns} dataSource={Data} size="small" bordered />
		// 	) : null}
		// </>
	);
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationCodeInfo: () => {
			dispatch(actions.getLocationCode());
		},
		getBaseURL: () => {
			dispatch(actions.getURL());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(DTOverSpeedTable);
