import React, { useState } from "react";
import { Layout } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchArea/SearchData";
import SearchResultTab from "../../organisms/searchResultTab/SearchResultTab";
// import "./style.less";

const SearchDownloadPage = () => {
	const [classification, setClassification] = useState(true);
	const [searchUnit, setSearchUnit] = useState(15);

	const { Content } = Layout;

	return (
		<div className="page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb />
						<SearchData
							classification={classification}
							setClassification={setClassification}
							searchUnit={searchUnit}
							setSearchUnit={setSearchUnit}
							period="SEARCH"
						/>
						<SearchResultTab
							classification={classification}
							searchUnit={searchUnit}
						/>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default SearchDownloadPage;
