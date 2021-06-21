import React, { useState, useEffect } from "react";
import { Layout } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import SearchCollapsedTable from "../../organisms/searchCollapsedTable/SearchCollapsedTable";

import "./style.less";

const SearchDownloadPage = (props) => {
	const { setLoggedIn, isMaster, setRealFirstFilter } = props;
	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [count, setCount] = useState(false);
	const [emptyErr, setEmptyErr] = useState(false);
	const [futureErr, setFutureErr] = useState(false);
	const [over31Err, setOver31Err] = useState(false);

	const { Content } = Layout;

	useEffect(() => {
		setRealFirstFilter(false);
	}, []);

	return (
		<div className="page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
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
							firstFilter={firstFilter}
							setCount={setCount}
							setLoggedIn={setLoggedIn}
							emptyErr={emptyErr}
							futureErr={futureErr}
							over31Err={over31Err}
							cascaderText="기간 별 조회를 희망하는 구간을 선택하세요"
						/>
						{firstFilter ? (
							<SearchCollapsedTable
								startDate={startDate}
								endTime={endTime}
								setLoggedIn={setLoggedIn}
								setEmptyErr={setEmptyErr}
								setFutureErr={setFutureErr}
								setOver31Err={setOver31Err}
							/>
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default SearchDownloadPage;
