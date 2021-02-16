import React, { useState } from "react";
import { Layout, Typography, Divider } from "antd";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import SignupForm from "../../organisms/accountForm/SignupForm";

import "./style.less";

const SignupPage = () => {
	const { Content } = Layout;
	const { Title } = Typography;
	return (
		<div className="account-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["데시보드", "개인정보", "계정 발급"]} />
						<Title level={3} style={{ minWidth: 120 }}>
							계정 발급
						</Title>
						<Divider />
						<SignupForm />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default SignupPage;
