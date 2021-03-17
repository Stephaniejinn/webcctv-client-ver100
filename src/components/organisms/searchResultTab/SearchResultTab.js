import React from "react";
import { Tabs } from "antd";

import SearchCollapsedTable from "../../molecules/searchCollapsedTable/SearchCollapsedTable";

import "./style.less";

const SearchResultTab = ({ classification }) => {
	const { TabPane } = Tabs;

	const callback = (key) => {
		console.log(key);
	};

	return (
		<div className="search-result-tab">
			<Tabs defaultActiveKey="1" onChange={callback}>
				<TabPane tab="구간 전체" key="1">
					<SearchCollapsedTable />
				</TabPane>
				<TabPane tab="1 차선" key="2">
					result
				</TabPane>
			</Tabs>
		</div>
	);
};

export default SearchResultTab;
