import React, { useEffect, useState } from "react";
import { Table, Spin, Button, Modal } from "antd";

import "../style.less";

const SearchOverSpeedTable = (props) => {
	const { overSpeedData } = props;

	const [Data, setData] = useState([]);
	const [isModalVisible, setIsModalVisible] = useState(false);

	useEffect(() => {
		setData(overSpeedData);
	}, [overSpeedData]);

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
						<a href={imglink}>과속차량 이미지 보기</a>
						{/* <img alt="과속차량 이미지" src={imglink} /> */}
						{/* <p>{imglink}</p> */}
					</Modal>
				</>
			),
		},
	];

	return (
		<>
			{Data.length === 0 ? (
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

export default SearchOverSpeedTable;
