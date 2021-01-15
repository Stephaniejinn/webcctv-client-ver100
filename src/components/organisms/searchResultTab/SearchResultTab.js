import React from "react";
import { Tabs } from "antd";

import TableCollapse from "../../molecules/tableCollapse/TableCollapse";

import "./style.less";

const { TabPane } = Tabs;

function callback(key) {
	console.log(key);
}

const SearchResultTab = ({ classification, searchUnit }) => {
	console.log(classification);
	console.log(typeof classification);

	return (
		<div className="search-result-tab">
			{classification ? (
				<Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane tab="구간 전체" key="1">
						<TableCollapse
							classification={classification}
							searchUnit={searchUnit}
						/>
					</TabPane>
					<TabPane tab="1 차선" key="2">
						result
					</TabPane>
				</Tabs>
			) : (
				<Tabs defaultActiveKey="1" onChange={callback}>
					<TabPane tab="2020-01-01" key="1">
						<TableCollapse />
					</TabPane>
					<TabPane tab="2020-01-01" key="2">
						result
					</TabPane>
				</Tabs>
			)}
		</div>
	);
};

export default SearchResultTab;
