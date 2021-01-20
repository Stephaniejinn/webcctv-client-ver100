import React from "react";
import { Pie } from "@ant-design/charts";

const MyDoughnutPie = () => {
	var data = [
		{
			type: "分类一",
			value: 27,
		},
		{
			type: "分类二",
			value: 25,
		},
		{
			type: "分类三",
			value: 18,
		},
		{
			type: "分类四",
			value: 15,
		},
		{
			type: "分类五",
			value: 10,
		},
	];
	var config = {
		appendPadding: 0,
		data: data,
		angleField: "value",
		colorField: "type",
		radius: 1,
		innerRadius: 0.53,
		legend: false,
		label: {
			type: "inner",
			offset: "-50%",
			content: "{value}대",
			style: {
				textAlign: "center",
				fontSize: 12,
			},
		},
		interactions: [{ type: "element-selected" }, { type: "element-active" }],
		statistic: {
			title: false,
			content: {
				style: {
					whiteSpace: "pre-wrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
					fontSize: 20,
				},
				value: {
					formatter: function formatter(v) {
						return "".concat(v, "대");
					},
				},
			},
		},
	};
	return <Pie {...config} />;
};
export default MyDoughnutPie;
