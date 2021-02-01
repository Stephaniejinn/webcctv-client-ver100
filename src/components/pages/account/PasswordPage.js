import React, { useState } from "react";
import { Layout, Typography, Divider } from "antd";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import PasswordForm from "../../organisms/accountForm/PasswordFrom";

import "./style.less";

const PasswordPage = () => {
	const { Content } = Layout;
	const { Title } = Typography;
	return (
		<div className="account-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb />
						<Title level={3} style={{ minWidth: 160 }}>
							비밀번호 변경
						</Title>
						<Divider />
						<PasswordForm />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default PasswordPage;
