import React, { useState } from "react";
import { Layout } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import SearchResultTab from "../../organisms/searchResultTab/SearchResultTab";

import "../style.less";

const SearchDownloadPage = () => {
	const [timeClassification, setTimeClassification] = useState(true);
	const [searchUnit, setSearchUnit] = useState("15M");
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");

	const { Content } = Layout;

	return (
		<div className="page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["데시보드", "기간 별 데이터 조회"]} />
						<SearchData
							period="SEARCH"
							classification={timeClassification}
							setClassification={setTimeClassification}
							searchUnit={searchUnit}
							setSearchUnit={setSearchUnit}
							startDate={startDate}
							setStartDate={setStartDate}
							endTime={endTime}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
						/>
						{firstFilter ? (
							<SearchResultTab
								classification={timeClassification}
								searchUnit={searchUnit}
							/>
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default SearchDownloadPage;
