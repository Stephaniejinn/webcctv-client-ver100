import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Menu, Dropdown, Typography, Divider, Avatar } from "antd";
import {
	IdcardOutlined,
	UserOutlined,
	ExportOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import "./style.less";

var userInfo = { userName: "", userAffiliation: "", userAvatarAbbr: "" };

const MyAvatar = () => {
	const { Text } = Typography;

	const dropdownContent = (
		<Menu style={{ width: 190 }}>
			<Menu.Item>
				<Text type="secondary" strong style={{ marginBottom: 6 }}>
					접속 계정:{userInfo.userName}
				</Text>
				<Text type="secondary" strong>
					소속: {userInfo.userAffiliation}
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
				{userInfo.userAvatarAbbr}
			</Avatar>
		</Dropdown>
	);
};
const mapStateToProps = (state) => {
	userInfo.userName = state.userInfo.username;
	userInfo.userAffiliation = state.userInfo.affiliation;
	userInfo.userAvatarAbbr = userInfo.userName.slice(0, 1);
	return {
		username: userInfo.userName,
		affiliation: userInfo.userAffiliation,
		// avatarAbbr: userInfo.userAvatarAbbr,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getUserInfo: () => {
			dispatch(actions.userInfo());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAvatar);
