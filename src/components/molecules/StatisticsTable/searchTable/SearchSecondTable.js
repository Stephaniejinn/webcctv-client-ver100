import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";

import "../style.less";

const SearchSecondTable = (props) => {
	const { secondData } = props;

	const [Data, setData] = useState([]);

	useEffect(() => {
		setData(secondData);
	}, [secondData]);

	const columns = [
		{
			title: "시간",
			dataIndex: "time",
		},
		{
			title: "전체",
			dataIndex: "Total",
			children: [
				{
					title: "주야율",
					dataIndex: "totalDayNightRatio",
					key: "totalNightRatio",
				},
				{
					title: "PHF",
					dataIndex: "totalPHF",
					key: "totalPHF",
				},
				{
					title: "첨두유율",
					dataIndex: "totalPeekHourCnt",
					key: "totalPeekHourCnt",
				},
				{
					title: "집중률",
					dataIndex: "totalVehiclePeakHourConcentrationRatio",
					key: "totalVehiclePeakHourConcentrationRatio",
				},
			],
		},
		{
			title: "승용차",
			key: "car",
			children: [
				{
					title: "주야율",
					dataIndex: "carDayNightRatio",
					key: "carDayNightRatio",
				},
			],
		},
		{
			title: "버스",
			key: "bus",
			children: [
				{
					title: "주야율",
					dataIndex: "busDayNightRatio",
					key: "busDayNightRatio",
				},
			],
		},
		{
			title: "화물차",
			key: "truck",
			children: [
				{
					title: "주야율",
					dataIndex: "truckDayNightRatio",
					key: "truckDayNightRatio",
				},
			],
		},
		{
			title: "이륜차",
			key: "motor",
			children: [
				{
					title: "주야율",
					dataIndex: "motorDayNightRatio",
					key: "motorDayNightRatio",
				},
			],
		},
	];

	return (
		<>
			{Data.length === 0 ? (
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
			) : (
				<Table columns={columns} dataSource={Data} size="small" bordered />
			)}
		</>
	);
};
export default SearchSecondTable;
