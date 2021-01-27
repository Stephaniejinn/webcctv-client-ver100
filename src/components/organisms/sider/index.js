import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { Layout, Menu, Divider, Typography } from "antd";
import {
	FundProjectionScreenOutlined,
	PieChartOutlined,
	FileTextOutlined,
	VideoCameraOutlined,
	BarChartOutlined,
	PicRightOutlined,
} from "@ant-design/icons";

// import logo from "../../../assets/logo/logoBlueWN.png";
// import logoCollapsed from "../../../assets/logo/logoBlue.png";
import logo from "../../../assets/logo/logoBlackWN.png";
import logoCollapsed from "../../../assets/logo/logoBlack.png";

import "./style.less";

const { Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;
const MySider = () => {
	const [siderCollapsed, setSiderCollapsed] = useState(false);
	const onCollapse = (collapsed) => {
		setSiderCollapsed(collapsed);
	};

	return (
		<Sider
			collapsible
			collapsed={siderCollapsed}
			onCollapse={onCollapse}
			theme="light"
			width="240"
			style={{ paddingLeft: 15, paddingRight: 7 }}
		>
			<div className="logo-position">
				{siderCollapsed ? (
					<img
						src={logoCollapsed}
						className="logo-collapsed"
						alt="logo collapsed"
					/>
				) : (
					<>
						<img src={logo} className="logo" alt="logo" />
						<Divider type="vertical" />
						<Text strong type="secondary">
							대시보드
						</Text>
					</>
				)}
			</div>
			<div className="sider-divider">
				<Divider />
			</div>
			<Menu
				theme="light"
				defaultSelectedKeys={["1"]}
				mode="inline"
				// selectedKeys={key}
			>
				<Menu.Item key="1" icon={<VideoCameraOutlined />}>
					<Link to="/realtime/streaming">실시간 영상</Link>
				</Menu.Item>
				<Menu.Item key="2" icon={<FundProjectionScreenOutlined />}>
					<Link to="/realtime/statistic">실시간 데이터</Link>
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
						<Link to="/statistic/week">주간 별</Link>
					</Menu.Item>
					<Menu.Item key="5" icon={<PicRightOutlined />}>
						<Link to="/statistic/month">월간 별</Link>
					</Menu.Item>
				</SubMenu>
				<Menu.Item key="6" icon={<FileTextOutlined />}>
					<Link to="/search">데이터 조회 및 다운로드</Link>
				</Menu.Item>
				<Menu.Item key="7" icon={<PieChartOutlined />}>
					<Link to="/comparison">통계 비교</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default MySider;
