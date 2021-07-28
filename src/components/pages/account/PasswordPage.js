import React, { useEffect } from "react";
import { Layout, Typography, Divider } from "antd";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import PasswordForm from "../../organisms/accountForm/PasswordFrom";
import Header from "../../organisms/header";
import Sider from "../../organisms/sider";
import "./style.less";

const PasswordPage = (props) => {
	const { setLoggedIn, isMaster, setRealFirstFilter } = props;
	const { Content } = Layout;
	const { Title } = Typography;

	useEffect(() => {
		setRealFirstFilter(false);
	}, []);

	return (
		<div className="account-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb
							pageHierarchy={["대시보드", "개인정보", "비밀번호 변경"]}
						/>
						<Title level={3} style={{ minWidth: 160 }}>
							비밀번호 변경
						</Title>
						<Divider />
						<PasswordForm isMaster={isMaster} setLoggedIn={setLoggedIn} />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default PasswordPage;
