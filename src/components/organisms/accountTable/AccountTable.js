import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
	Table,
	Tag,
	message,
	Spin,
	Typography,
	Popconfirm,
	Divider,
} from "antd";
import {
	CheckCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";

import "./style.less";

const AccountTable = (props) => {
	const { baseURL } = props;
	const { Text } = Typography;
	const { setLoggedIn } = props;
	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(false);
	const [isEmptyData, setEmptyData] = useState(false);
	var TotalData = [];

	useEffect(() => {
		setLoadingData(true);
		setEmptyData(false);
		setData([]);
		axiosData();
	}, []);
	const handleUnlock = (key, username) => {
		axios
			.delete(`${baseURL}/users/${username}/lock`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				const dataSource = [...Data];
				dataSource[key]["locked"] = false;
				setData(dataSource);
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setLoggedIn(false);
				} else if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				}
			});
	};

	const handleDelete = (key, username) => {
		axios
			.delete(`${baseURL}/users/${username}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				const dataSource = [...Data];
				setData(dataSource.filter((item) => item.key !== key));
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setLoggedIn(false);
				} else if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				}
			});
	};
	const columns = [
		{
			title: "아이디",
			dataIndex: "username",
			key: "username",
		},

		{
			title: "소속",
			dataIndex: "affiliate",
			key: "affiliate",
		},
		{
			title: "상태",
			key: "locked",
			dataIndex: "locked",
			render: (text, record) => (
				<>
					{record.locked ? (
						<>
							<Tag icon={<ExclamationCircleOutlined />} color="red">
								잠김
							</Tag>
							<Divider type="vertical" />
							<Popconfirm
								title="잠금을 해체하시겠습니까?"
								onConfirm={() => handleUnlock(record.key, record.username)}
								okText="예"
								cancelText="아니요"
							>
								<a
									style={{
										color: "#688df2",
										marginLeft: 7,
										alignSelf: "baseline",
									}}
								>
									잠금 해제
								</a>
							</Popconfirm>
						</>
					) : (
						<>
							<Tag icon={<CheckCircleOutlined />} color="green">
								정상
							</Tag>
							<Divider type="vertical" />
							<Text
								style={{
									color: "#dcdee0",
									marginLeft: 7,
									alignSelf: "baseline",
								}}
							>
								잠금 해제
							</Text>
						</>
					)}
				</>
			),
		},
		{
			title: "",
			dataIndex: "deleteAcc",

			key: "deleteAcc",
			render: (text, record) => (
				<>
					<Popconfirm
						title="계정을 삭제하시겠습니까?"
						onConfirm={() => handleDelete(record.key, record.username)}
						okText="예"
						cancelText="아니요"
					>
						<a
							style={{
								color: "#688df2",
								alignSelf: "baseline",
							}}
						>
							계정 삭제
						</a>
					</Popconfirm>
				</>
			),
		},
	];

	const axiosData = () => {
		axios
			.get(`${baseURL}/users`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				if (res.data.length !== 0) {
					res.data.forEach((eachData, index) => {
						const { username, affiliate, locked } = eachData;
						let dataTemp = {};

						dataTemp["key"] = index;
						dataTemp["username"] = username;
						dataTemp["affiliate"] = affiliate;
						dataTemp["locked"] = locked;
						TotalData.push(dataTemp);
					});
					setData(TotalData);
					setLoadingData(false);
					setEmptyData(false);
				} else {
					setEmptyData(true);
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setLoggedIn(false);
				} else if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				}
				setEmptyData(true);
			});
	};
	return (
		<div className="account-table">
			{isEmptyData ? (
				<div className="empty-data-text">
					<Text strong>발급된 계정이 없습니다</Text>
				</div>
			) : isLoadingData ? (
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
					pagination={{ hideOnSinglePage: true }}
					columns={columns}
					dataSource={Data}
				/>
			)}
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(AccountTable);
