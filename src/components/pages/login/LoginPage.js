import React, { useState } from "react";
import { Layout, Typography, Divider } from "antd";

import Header from "../../organisms/header";
import LoginCard from "../../organisms/loginCard/LoginCard";

import "./style.less";

const LoginPage = () => {
	const { Content } = Layout;
	const { Title } = Typography;
	return (
		<div className="login-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Layout className="site-layout">
					<Header page="SIGNIN" />
					<Content style={{ margin: "0" }}>
						<div className="site-layout-background" style={{ minHeight: 720 }}>
							<Title>AI 도로교통현황 대시보드</Title>
							<LoginCard />
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default LoginPage;
