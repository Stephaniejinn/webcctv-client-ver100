import React, { useEffect, useState } from "react";
import { Table, Spin, Button, Modal } from "antd";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import "./style.less";

const OverSpeedTable = (props) => {
	const { startDate, endTime, cameraCode, baseURL, page } = props;

	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	var TotalData = [];
	var countCol;

	useEffect(() => {
		if (page) {
			setLoadingData(true);
			countCol = 0;
			axiosSearchData();
		} else {
			setLoadingData(true);
			axiosData();
		}
		return () => {
			console.log("count");
			setData(TotalData);
		};
		// setLoadingData(true);
		// axiosData();
	}, [startDate, endTime, cameraCode]);

	const columns = [
		{
			title: "시간",
			dataIndex: "time",
			key: "time",
		},
		{
			title: "차량번호",
			dataIndex: "licenseNumber",
			key: "licenseNumber",
		},
		{
			title: "위반속도(km/h)",
			dataIndex: "speed",
			key: "speed",
		},
		{
			title: "차종",
			dataIndex: "vehicleType",
			key: "vehicleType",
		},
		{
			title: "이미지",
			dataIndex: "imageLink",
			key: "imageLink",
			render: (imglink) => (
				<>
					<Button
						type="link"
						size="small"
						onClick={() => setIsModalVisible(true)}
					>
						이미지 링크
					</Button>
					<Modal
						title="과속차량 이미지"
						centered
						maskStyle={{ backgroundColor: "transparent" }}
						visible={isModalVisible}
						onOk={() => setIsModalVisible(false)}
						onCancel={() => setIsModalVisible(false)}
						footer={[
							<Button
								key="submit"
								type="primary"
								onClick={() => setIsModalVisible(false)}
							>
								확인
							</Button>,
						]}
					>
						<p>{imglink}</p>
					</Modal>
				</>
			),
		},
	];

	const axiosData = () => {
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
				setLoadingData(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const axiosSearchData = () => {
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
				console.log("count search overspeed axios");
				res.data.some((eachData, index) => {
					const {
						recordTime,
						vehicleType,
						licenseNumber,
						speed,
						imageLink,
					} = eachData;
					if (countCol === 5) {
						return true;
					}
					countCol += 1;
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
				setLoadingData(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			{isLoadingData ? (
				<div
					style={{
						marginTop: 20,
						marginBottom: 20,
						textAlign: "center",
						paddingTop: 30,
						paddingBottom: 30,
					}}
				>
					<Spin size="large" />
				</div>
			) : (
				<Table columns={columns} dataSource={Data} size="small" bordered />
			)}
		</>
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
export default connect(mapStateToProps, mapDispatchToProps)(OverSpeedTable);
