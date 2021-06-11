import React, { useEffect, useState } from "react";
import { Table, Tag, message, Spin, Typography } from "antd";
import {
	CheckCircleOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { connect } from "react-redux";

import "./style.less";

const AccountTable = (props) => {
	const { Text } = Typography;
	const { setLoggedIn } = props;
	const [Data, setData] = useState([]);
	const [isLoadingData, setLoadingData] = useState(false);
	const [isEmptyData, setEmptyData] = useState(false);
	const baseURL = "http://192.168.1.100:3000/api";
	var TotalData = [];

	// useEffect(() => {
	// 	setLoadingData(true);
	// 	setEmptyData(false);
	// 	setData([]);
	// 	axiosData();
	// }, []);

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
			title: "계정상태",
			key: "locked",
			dataIndex: "locked",
			render: (locked) => (
				<>
					{locked ? (
						<Tag icon={<ExclamationCircleOutlined />} color="red">
							잠김
						</Tag>
					) : (
						<Tag icon={<CheckCircleOutlined />} color="green">
							정상
						</Tag>
					)}
				</>
			),
		},
	];

	const data = [
		{
			key: "1",
			username: "John Brown",
			affiliate: "New York No. 1 Lake Park",
			locked: true,
		},
		{
			key: "2",
			username: "Jim Green",
			affiliate: "London No. 1 Lake Park",
			locked: false,
		},
		{
			key: "3",
			username: "Joe Black",
			affiliate: "Sidney No. 1 Lake Park",
			locked: false,
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
				console.log(res);
				if (res.data.length !== 0) {
					res.data.forEach((eachData, index) => {
						const { username, affiliate, locked } = eachData;
						let dataTemp = {};

						dataTemp["key"] = index.toString();
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
					dataSource={data}
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
