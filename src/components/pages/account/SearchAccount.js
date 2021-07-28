import React, { useEffect } from "react";
import { Layout, Typography, Divider } from "antd";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import AccountTable from "../../organisms/accountTable/AccountTable";
import Header from "../../organisms/header";
import Sider from "../../organisms/sider";
import "./style.less";

const SearchAccount = (props) => {
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
							pageHierarchy={["대시보드", "사용자 정보", "계정 조회"]}
						/>
						<Title level={3} style={{ minWidth: 160 }}>
							발급 계정 조회
						</Title>
						<Divider style={{ width: "100%" }} />
						<AccountTable isMaster={isMaster} setLoggedIn={setLoggedIn} />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default SearchAccount;
