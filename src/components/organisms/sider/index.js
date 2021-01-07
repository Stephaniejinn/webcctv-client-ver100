import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Layout, Menu, Divider } from "antd";
import {
	FundProjectionScreenOutlined,
	PieChartOutlined,
	FileTextOutlined,
	VideoCameraOutlined,
	BarChartOutlined,
	PicRightOutlined,
} from "@ant-design/icons";

import logo from "../../../assets/logo/logoBlueWN.png";
import logoCollapsed from "../../../assets/logo/logoBlue.png";

import "./style.less";

const { Sider } = Layout;
const { SubMenu } = Menu;

const MySider = () => {
	const [siderCollapsed, setSiderCollapsed] = useState(false);
	// console.log("first state", siderCollapsed);
	const onCollapse = (collapsed) => {
		setSiderCollapsed(collapsed);
		// console.log("state", siderCollapsed);
	};

	var siderLogo;
	if (siderCollapsed) {
		siderLogo = (
			<div className="logo-position">
				<img
					src={logoCollapsed}
					className="logo-collapsed"
					alt="logo collapsed"
				/>
			</div>
		);
	} else {
		siderLogo = (
			<div className="logo-position">
				<img src={logo} className="logo" alt="logo" />
				<Divider type="vertical" />
				<div style={{ color: "#595c97" }}>대시보드</div>
			</div>
		);
	}

	return (
		<Sider
			collapsible
			collapsed={siderCollapsed}
			onCollapse={onCollapse}
			theme="light"
		>
			{siderLogo}
			<Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
				<Menu.Item key="1" icon={<VideoCameraOutlined />}>
					<Link to="/realtime/streaming">실시간 영상</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<FundProjectionScreenOutlined />}>
					<Link to="/">실시간 데이터</Link>
				</Menu.Item>
				<SubMenu
					key="sub1"
					icon={<BarChartOutlined />}
					title="누적 통계 데이터 분석"
				>
					<Menu.Item key="3" icon={<PicRightOutlined />}>
						<Link to="/statistic/day">일간 별</Link>
					</Menu.Item>
					<Menu.Item key="4" icon={<PicRightOutlined />}>
						<Link to="/">주간 별</Link>
					</Menu.Item>
					<Menu.Item key="5" icon={<PicRightOutlined />}>
						<Link to="/">월간 별</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key="6" icon={<FileTextOutlined />}>
					<Link to="/">데이터 조회 및 다운로드</Link>
				</Menu.Item>
				<Menu.Item key="7" icon={<PieChartOutlined />}>
					<Link to="/">통계 비교</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default MySider;
