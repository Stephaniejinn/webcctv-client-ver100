import React, { useEffect } from "react";
import { Layout, Typography } from "antd";

import Header from "../../organisms/header";
import LoginCard from "../../organisms/loginCard/LoginCard";

import "./style.less";

const LoginPage = (props) => {
	const { setLoggedIn, setRealFirstFilter } = props;
	const { Content, Footer } = Layout;
	const { Title, Text } = Typography;

	useEffect(() => {
		setRealFirstFilter(false);
	}, []);

	return (
		<div className="login-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Layout className="site-layout">
					<Header page="SIGNIN" />
					<Content style={{ margin: "0" }}>
						<div className="site-layout-background" style={{ minHeight: 720 }}>
							<Title level={2} style={{ marginTop: 20 }}>
								글로벌브릿지
							</Title>
							<Title level={2} style={{ marginTop: 0, minWidth: 454 }}>
								인공지능 교통 데이터 수집 시스템
							</Title>
							<Text type="secondary">GBAI-ITS Ver.100-2020</Text>
							<LoginCard setLoggedIn={setLoggedIn} />
						</div>
					</Content>
					<Footer style={{ textAlign: "center" }}>
						GBAI-ITS Ver.100-2020 Created by Global Bridge Co., Ltd
					</Footer>
				</Layout>
			</Layout>
		</div>
	);
};

export default LoginPage;
