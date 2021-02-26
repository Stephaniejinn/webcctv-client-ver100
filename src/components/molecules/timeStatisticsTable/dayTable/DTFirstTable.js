import React from "react";
import { Table } from "antd";

import "../style.less";

const DTFisrtTable = (props) => {
	const { startDate, endTime, timeClassification, interval } = props;

	const columns = [
		{
			title: "시간",
			dataIndex: "time",
			// render: (value, row, index) => {
			// 	const obj = {
			// 		children: value,
			// 		props: {},
			// 	};
			// 	if (index === 0) {
			// 		obj.props.rowSpan = 6;
			// 	}
			// 	if (index > 0 && index < 6) {
			// 		obj.props.rowSpan = 0;
			// 	}

			// 	if (index === 6) {
			// 		obj.props.rowSpan = 5;
			// 	}
			// 	// These two are merged into above cell
			// 	if (index > 6 && index < 11) {
			// 		obj.props.rowSpan = 0;
			// 	}
			// 	return obj;
			// },
		},
		{
			title: "전체",
			dataIndex: "Total",
			children: [
				{
					title: "통행량",
					dataIndex: "totalCount",
					key: "count",
					// width: 50,
				},
				{
					title: "평균속도",
					dataIndex: "totalAvgSpeed",
					key: "avgSpeed",
					// width: 50,
				},
				{
					title: "PCU",
					dataIndex: "totalpcu",
					key: "pcu",
					// width: 50,
				},
				{
					title: "과속",
					dataIndex: "totalOverSpeed",
					key: "overSpeed",
					// width: 50,
				},
			],
		},
		{
			title: "승용차",
			// dataIndex: "car",
			children: [
				{
					title: "통행량",
					dataIndex: "carCount",
					key: "carCount",
					// width: 50,
				},
				{
					title: "평균속도",
					dataIndex: "carAvgSpeed",
					key: "avgSpeed",
					// width: 50,
				},
				{
					title: "PCU",
					dataIndex: "carpcu",
					key: "pcu",
					// width: 50,
				},
				{
					title: "비율",
					dataIndex: "carRatio",
					key: "ratio",
					// width: 50,
				},
				{
					title: "과속",
					dataIndex: "carOverSpeed",
					key: "overSpeed",
					// width: 50,
				},
			],
		},
		{
			title: "버스",
			// dataIndex: "car",
			children: [
				{
					title: "통행량",
					dataIndex: "busCount",
					key: "carCount",
					// width: 50,
				},
				{
					title: "평균속도",
					dataIndex: "busAvgSpeed",
					key: "avgSpeed",
					// width: 50,
				},
				{
					title: "PCU",
					dataIndex: "buspcu",
					key: "pcu",
					// width: 50,
				},
				{
					title: "비율",
					dataIndex: "busRatio",
					key: "ratio",
					// width: 50,
				},
				{
					title: "과속",
					dataIndex: "busOverSpeed",
					key: "overSpeed",
					// width: 50,
				},
			],
		},
		{
			title: "화물차",
			// dataIndex: "car",
			children: [
				{
					title: "통행량",
					dataIndex: "truckCount",
					key: "carCount",
					// width: 50,
				},
				{
					title: "평균속도",
					dataIndex: "truckAvgSpeed",
					key: "avgSpeed",
					// width: 50,
				},
				{
					title: "PCU",
					dataIndex: "truckpcu",
					key: "pcu",
					// width: 50,
				},
				{
					title: "비율",
					dataIndex: "truckRatio",
					key: "ratio",
					// width: 50,
				},
				{
					title: "과속",
					dataIndex: "truckOverSpeed",
					key: "overSpeed",
					// width: 50,
				},
			],
		},
		{
			title: "이륜차",
			// dataIndex: "car",
			children: [
				{
					title: "통행량",
					dataIndex: "motorCount",
					key: "carCount",
					// width: 50,
				},
				{
					title: "평균속도",
					dataIndex: "motorAvgSpeed",
					key: "avgSpeed",
					// width: 50,
				},
				{
					title: "PCU",
					dataIndex: "motorpcu",
					key: "pcu",
					// width: 50,
				},
				{
					title: "비율",
					dataIndex: "motorRatio",
					key: "ratio",
					// width: 50,
				},
				{
					title: "과속",
					dataIndex: "motorOverSpeed",
					key: "overSpeed",
					// width: 50,
				},
			],
		},
		{
			title: "보행자",
			// dataIndex: "car",
			children: [
				{
					title: "수",
					dataIndex: "person",
					key: "carCount",
					// width: 50,
				},
				{
					title: "무단횡단",
					dataIndex: "jaywalk",
					key: "avgSpeed",
					// width: 50,
				},
			],
		},
	];

	const data = [
		{
			key: "0",
			time: "전체",
			totalCount: "3대",
			totalAvgSpeed: "50km/h",
			totalpcu: "3",
			totalOverSpeed: "3대",

			carCount: "3대",
			carAvgSpeed: "50km/h",
			carpcu: "3",
			carRatio: "25%",
			carOverSpeed: "3대",

			busCount: "3대",
			busAvgSpeed: "50km/h",
			buspcu: "3",
			busRatio: "25%",
			busOverSpeed: "3대",

			truckCount: "3대",
			truckAvgSpeed: "50km/h",
			truckpcu: "3",
			truckRatio: "25%",
			truckOverSpeed: "3대",

			motorCount: "3대",
			motorAvgSpeed: "50km/h",
			motorpcu: "3",
			motorRatio: "25%",
			motorOverSpeed: "3대",

			person: "1명",
			jaywalk: "1명",
		},
		{
			key: "1",
			time: "00:00-00:15",
			totalCount: "3대",
			totalAvgSpeed: "50km/h",
			totalpcu: "3",
			totalOverSpeed: "3대",

			carCount: "3대",
			carAvgSpeed: "50km/h",
			carpcu: "3",
			carRatio: "25%",
			carOverSpeed: "3대",

			busCount: "3대",
			busAvgSpeed: "50km/h",
			buspcu: "3",
			busRatio: "25%",
			busOverSpeed: "3대",

			truckCount: "3대",
			truckAvgSpeed: "50km/h",
			truckpcu: "3",
			truckRatio: "25%",
			truckOverSpeed: "3대",

			motorCount: "3대",
			motorAvgSpeed: "50km/h",
			motorpcu: "3",
			motorRatio: "25%",
			motorOverSpeed: "3대",

			person: "1명",
			jaywalk: "1명",
		},
	];
	return <Table columns={columns} dataSource={data} size="small" bordered />;
};
export default DTFisrtTable;
