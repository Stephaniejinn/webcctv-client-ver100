import React, { useState } from "react";
import { Layout } from "antd";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import SearchArea from "../../organisms/searchArea/SearchArea";
import SearchResultTab from "../../organisms/searchResultTab/SearchResultTab";
// import "./style.less";

const DataComparisonPage = () => {
	const [classification, setClassification] = useState(true);
	const [searchUnit, setSearchUnit] = useState(15);

	const { Content } = Layout;

	return (
		<div className="statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb />
						<SearchArea
							classification={classification}
							setClassification={setClassification}
							searchUnit={searchUnit}
							setSearchUnit={setSearchUnit}
							period="SEARCH"
						/>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default DataComparisonPage;
