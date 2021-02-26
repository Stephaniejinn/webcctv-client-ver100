import React from "react";
import { Table } from "antd";

import "../style.less";

const DTSecondTable = (props) => {
	const { startDate, endTime, timeClassification, interval } = props;

	const columns = [
		{
			title: "",
			dataIndex: "item",
		},
		{
			title: "전체",
			dataIndex: "Total",
		},
		{
			title: "승용차",
			dataIndex: "car",
		},
		{
			title: "버스",
			dataIndex: "bus",
		},
		{
			title: "화물차",
			dataIndex: "truck",
		},
		{
			title: "이륜차",
			dataIndex: "motor",
		},
	];

	const data = [
		{
			key: "0",
			item: "주간",
			total: "total",
			car: "3대",
			bus: "3대",
			truck: "3대",
			motor: "3대",
		},
		{
			key: "1",
			item: "야간",
			total: "total",
			car: "3대",
			bus: "3대",
			truck: "3대",
			motor: "3대",
		},
	];
	return <Table columns={columns} dataSource={data} size="small" bordered />;
};
export default DTSecondTable;
