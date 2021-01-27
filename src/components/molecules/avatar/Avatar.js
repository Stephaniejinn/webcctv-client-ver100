import React from "react";
// import axios from "axios";
import { HashLink as Link } from "react-router-hash-link";

import { Avatar, Menu, Dropdown, Typography, Divider } from "antd";
import {
	IdcardOutlined,
	UserOutlined,
	ExportOutlined,
} from "@ant-design/icons";

import "./style.less";

const { Text } = Typography;
const MyAvatar = () => {
	const dropdownContent = (
		<Menu style={{ width: 190 }}>
			<Menu.Item>
				<Text type="secondary" strong style={{ marginBottom: 6 }}>
					접속 계정:username
				</Text>
				<Text type="secondary" strong>
					소속: "affiliation"
				</Text>
			</Menu.Item>
			<Divider />
			<Menu.Item>
				<Link to="/signup" style={{ color: "#595c97" }}>
					<IdcardOutlined />
					계정 발급
				</Link>
			</Menu.Item>
			<Menu.Item>
				<Link to="/password" style={{ color: "#595c97" }}>
					<UserOutlined />
					비밀번호 변경
				</Link>
			</Menu.Item>
			<Divider />
			<Menu.Item>
				<Link to="/" style={{ color: "#595c97" }}>
					<ExportOutlined />
					로그아웃
				</Link>
			</Menu.Item>
		</Menu>
	);
	return (
		<Dropdown
			overlay={dropdownContent}
			trigger={["click"]}
			placement="bottomRight"
			arrow
		>
			<Avatar
				shape="square"
				style={{
					backgroundColor: "#e4e9f0",
					verticalAlign: "middle",
				}}
				size="large"
			>
				A
			</Avatar>
		</Dropdown>
	);
};
export default MyAvatar;
