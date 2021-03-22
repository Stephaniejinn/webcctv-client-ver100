import React, { useState } from "react";
import { Layout, Spin } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import SearchResultTab from "../../organisms/searchResultTab/SearchResultTab";
import SearchCollapsedTable from "../../molecules/searchCollapsedTable/SearchCollapsedTable";

import "../style.less";

const SearchDownloadPage = () => {
	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [count, setCount] = useState(false);

	const { Content } = Layout;

	return (
		<div className="page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "기간 별 데이터 조회"]} />
						<SearchData
							period="SEARCH"
							classification={timeClassification}
							setClassification={setTimeClassification}
							startDate={startDate}
							setStartDate={setStartDate}
							endTime={endTime}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
							setCount={setCount}
						/>
						{console.log("startDate", startDate)}
						{console.log("endTime", endTime)}
						{firstFilter ? (
							count ? (
								<SearchCollapsedTable startDate={startDate} endTime={endTime} />
							) : (
								<div
									style={{
										marginTop: 20,
										marginBottom: 20,
										textAlign: "center",
										paddingTop: 30,
										paddingBottom: 30,
									}}
								>
									<Spin size="large" />
								</div>
							)
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default SearchDownloadPage;
