import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Menu, Dropdown, Typography, Divider, Avatar, Button } from "antd";
import {
	IdcardOutlined,
	ExportOutlined,
	UsergroupAddOutlined,
	BarsOutlined,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./style.less";

const MyAvatar = (props) => {
	const { baseURL, setLoggedIn, isMaster } = props;
	const { Text } = Typography;
	const history = useHistory();

	const HandleLogout = () => {
		axios
			.delete(`${baseURL}/auth/tokens`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				// history.push("/*");
				window.sessionStorage.clear();
				setLoggedIn(false);
			})
			.catch((err) => {
				setLoggedIn(false);
				window.sessionStorage.clear();
			});
	};
	const dropdownContent = (
		<Menu style={{ width: 190 }}>
			<Menu.Item>
				<Text type="secondary" strong style={{ marginBottom: 6 }}>
					접속 계정:{sessionStorage.getItem("username")}
				</Text>
				<Text type="secondary" strong>
					소속: {sessionStorage.getItem("affiliate")}
				</Text>
			</Menu.Item>
			<Divider />
			{isMaster && (
				<>
					<Menu.Item>
						<Link to="/signup" style={{ color: "#595c97" }}>
							<UsergroupAddOutlined /> 계정 발급
						</Link>
					</Menu.Item>
					<Menu.Item>
						<Link to="/account" style={{ color: "#595c97" }}>
							<BarsOutlined /> 계정 조회
						</Link>
					</Menu.Item>
				</>
			)}

			<Menu.Item>
				<Link to="/password" style={{ color: "#595c97" }}>
					<IdcardOutlined />
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
				{sessionStorage.getItem("username").slice(0, 1).toUpperCase()}
			</Avatar>
		</Dropdown>
	);
};
const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};
export default connect(mapStateToProps)(MyAvatar);
