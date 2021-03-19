import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Menu, Dropdown, Typography, Divider, Avatar, Button } from "antd";
import {
	IdcardOutlined,
	UserOutlined,
	ExportOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import "./style.less";

const MyAvatar = (props) => {
	const { username, affiliation, setUserInfo } = props;
	const { Text } = Typography;
	const HandleLogout = () => {
		// console.log("logout");
		let lougout = { isloggedIn: false };
		setUserInfo(lougout);
	};
	const dropdownContent = (
		<Menu style={{ width: 190 }}>
			<Menu.Item>
				<Text type="secondary" strong style={{ marginBottom: 6 }}>
					접속 계정:{username}
				</Text>
				<Text type="secondary" strong>
					소속: {affiliation}
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
				<Button
					size="small"
					type="link"
					style={{ color: "#595c97" }}
					onClick={HandleLogout}
				>
					<ExportOutlined />
					로그아웃
				</Button>
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
				{username.slice(0, 1)}
			</Avatar>
		</Dropdown>
	);
};
const mapStateToProps = (state) => {
	return {
		username: state.userInfo.username,
		affiliation: state.userInfo.affiliation,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		// getUserInfo: () => {
		// 	dispatch(actions.userInfo());
		// },
		setUserInfo: (userInfo) => {
			dispatch(actions.setUserInfo(userInfo));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAvatar);
