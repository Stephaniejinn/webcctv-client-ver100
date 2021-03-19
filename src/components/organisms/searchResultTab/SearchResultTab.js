import React from "react";
import { Tabs } from "antd";

import SearchCollapsedTable from "../../molecules/searchCollapsedTable/SearchCollapsedTable";

import "./style.less";

const SearchResultTab = (props) => {
	const { startDate, endTime } = props;
	const { TabPane } = Tabs;

	const callback = (key) => {
		console.log(key);
	};

	return (
		<div className="search-result-tab">
			<SearchCollapsedTable />
		</div>
	);
};

export default SearchResultTab;
