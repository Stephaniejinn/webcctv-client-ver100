import React, { useEffect, useState } from "react";
import { Table, Spin, Button, Modal, Descriptions } from "antd";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import "./style.less";

const OverSpeedTable = (props) => {
	const { startDate, endTime, cameraCode, baseURL, camera } = props;

	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(true);
	const [isModalVisible, setModalVisible] = useState(false);
	const [shownKey, setShownKey] = useState("");
	var TotalData = [];

	useEffect(() => {
		setLoadingData(true);
		axiosData();
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
			title: "위반속도",
			dataIndex: "speed",
			key: "speed",
		},
		{
			title: "차선",
			dataIndex: "laneNumber",
			key: "laneNumber",
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
			render: (imgInfo) => (
				<>
					<Button
						type="link"
						size="small"
						onClick={() => setModalVisible(true)}
					>
						이미지 보기
					</Button>
					{shownKey.toString() === imgInfo[0] && (
						<>
							<Modal
								title="과속차량 이미지"
								centered
								maskStyle={{ backgroundColor: "transparent" }}
								bodyStyle={{ width: 600 }}
								style={{ width: 600 }}
								visible={isModalVisible}
								onOk={() => setModalVisible(false)}
								onCancel={() => setModalVisible(false)}
								footer={[
									<Button
										key="submit"
										type="primary"
										onClick={() => setModalVisible(false)}
									>
										확인
									</Button>,
								]}
							>
								<Descriptions bordered size="small">
									<Descriptions.Item label="위반차량" span={3}>
										{imgInfo[5]}
									</Descriptions.Item>
									<Descriptions.Item label="시간" span={2}>
										{imgInfo[2]}
									</Descriptions.Item>
									<Descriptions.Item label="위반속도">
										{imgInfo[3]}km/h
									</Descriptions.Item>
									<Descriptions.Item label="위치" span={2}>
										{camera}
									</Descriptions.Item>
									<Descriptions.Item label="위반차로">
										{imgInfo[4]}
									</Descriptions.Item>
								</Descriptions>
								<img
									style={{ marginTop: 15 }}
									alt="과속차량 이미지"
									src={imgInfo[1]}
								/>
							</Modal>
						</>
					)}
				</>
			),
		},
	];

	const axiosData = () => {
		axios
			.get(
				`${baseURL}/violations/speeding/records?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&limit=0&offset=0`,
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
						laneNumber,
						licenseNumber,
						speed,
						imageLink,
					} = eachData;
					let dataTemp = {};
					dataTemp["key"] = index.toString();
					if (startDate !== endTime) {
						dataTemp["time"] = moment(recordTime).format(
							"YYYY년 MM월 DD일 HH:mm:ss"
						);
					} else {
						dataTemp["time"] = moment(recordTime).format("HH:mm:ss");
					}
					dataTemp["vehicleType"] = vehicleType;
					dataTemp["licenseNumber"] = licenseNumber;
					dataTemp["speed"] = `${speed} km/h`;
					dataTemp["laneNumber"] = `${laneNumber} 차선`;
					dataTemp["imageLink"] = [
						index.toString(),
						imageLink,
						moment(recordTime).format("YYYY년 MM월 DD일 HH시 mm분 ss초"),
						speed,
						dataTemp["laneNumber"],
						licenseNumber,
					];
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
				<Table
					columns={columns}
					dataSource={Data}
					onRow={(record, rowIndex) => {
						return {
							onClick: (event) => {
								setShownKey(rowIndex);
							}, // click row
						};
					}} // rowSelection={rowSelection}
					size="small"
					bordered
				/>
			)}
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
		camera: state.location.camera,
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
