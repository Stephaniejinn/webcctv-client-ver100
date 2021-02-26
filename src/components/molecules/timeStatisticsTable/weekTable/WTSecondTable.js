import React from "react";
import { Table } from "antd";

import "../style.less";

const WTSecondTable = (props) => {
	const { startDate, endTime, timeClassification, interval } = props;

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
					// width: 50,
				},
				{
					title: "PHF",
					dataIndex: "totalPHF",
					key: "totalPHF",
					// width: 50,
				},
				{
					title: "ADT",
					dataIndex: "totalADT",
					key: "totalADT",
					// width: 50,
				},
				{
					title: "첨두유율",
					dataIndex: "totalPeekHourCnt",
					key: "totalPeekHourCnt",
					// width: 50,
				},
			],
		},
		{
			title: "승용차",
			// dataIndex: "car",
			children: [
				{
					title: "주야율",
					dataIndex: "carDayNightRatio",
					key: "carNightRatio",
				},
				{
					title: "PHF",
					dataIndex: "carPHF",
					key: "carPHF",
				},
				{
					title: "ADT",
					dataIndex: "carADT",
					key: "carADT",
				},
				{
					title: "첨두유율",
					dataIndex: "carPeekHourCnt",
					key: "carPeekHourCnt",
				},
			],
		},
		{
			title: "버스",
			// dataIndex: "car",
			children: [
				{
					title: "주야율",
					dataIndex: "busDayNightRatio",
					key: "busNightRatio",
				},
				{
					title: "PHF",
					dataIndex: "busPHF",
					key: "busPHF",
				},
				{
					title: "ADT",
					dataIndex: "busADT",
					key: "busADT",
				},
				{
					title: "첨두유율",
					dataIndex: "busPeekHourCnt",
					key: "busPeekHourCnt",
				},
			],
		},
		{
			title: "화물차",
			// dataIndex: "car",
			children: [
				{
					title: "주야율",
					dataIndex: "truckDayNightRatio",
					key: "truckNightRatio",
				},
				{
					title: "PHF",
					dataIndex: "truckPHF",
					key: "truckPHF",
				},
				{
					title: "ADT",
					dataIndex: "truckADT",
					key: "truckADT",
				},
				{
					title: "첨두유율",
					dataIndex: "truckPeekHourCnt",
					key: "truckPeekHourCnt",
				},
			],
		},
		{
			title: "이륜차",
			// dataIndex: "car",
			children: [
				{
					title: "주야율",
					dataIndex: "motorDayNightRatio",
					key: "motorNightRatio",
				},
				{
					title: "PHF",
					dataIndex: "motorPHF",
					key: "motorPHF",
				},
				{
					title: "ADT",
					dataIndex: "motorADT",
					key: "motorADT",
				},
				{
					title: "첨두유율",
					dataIndex: "motorPeekHourCnt",
					key: "motorPeekHourCnt",
				},
			],
		},
	];

	const data = [
		{
			key: "0",
			time: "전체",
			totalDayNightRatio: "10%",
			totalPHF: "10%",
			totalADT: "10000",
			totalPeekHourCnt: "1000",

			carDayNightRatio: "10%",
			carPHF: "10%",
			carADT: "10000",
			carPeekHourCnt: "1000",

			busDayNightRatio: "10%",
			busPHF: "10%",
			busADT: "10000",
			busPeekHourCnt: "1000",

			truckDayNightRatio: "10%",
			truckPHF: "10%",
			truckADT: "10000",
			truckPeekHourCnt: "1000",

			motorDayNightRatio: "10%",
			motorPHF: "10%",
			motorADT: "10000",
			motorPeekHourCnt: "1000",
		},
		{
			key: "1",
			time: "평일 전체",
			totalDayNightRatio: "10%",
			totalPHF: "10%",
			totalADT: "10000",
			totalPeekHourCnt: "1000",

			carDayNightRatio: "10%",
			carPHF: "10%",
			carADT: "10000",
			carPeekHourCnt: "1000",

			busDayNightRatio: "10%",
			busPHF: "10%",
			busADT: "10000",
			busPeekHourCnt: "1000",

			truckDayNightRatio: "10%",
			truckPHF: "10%",
			truckADT: "10000",
			truckPeekHourCnt: "1000",

			motorDayNightRatio: "10%",
			motorPHF: "10%",
			motorADT: "10000",
			motorPeekHourCnt: "1000",
		},
	];
	return <Table columns={columns} dataSource={data} size="small" bordered />;
};
export default WTSecondTable;
