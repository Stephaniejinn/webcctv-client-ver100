import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/charts";
import { Spin } from "antd";

const GeneralOverSpeed = (props) => {
	const { trafficData } = props;

	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setData([]);
		parseTotalData();
	}, [trafficData]);

	const parseTotalData = () => {
		console.log("count 일간 시간별 PHF parse");
		var TotalData = [
			{ type: "승용차", value: 0 },
			{ type: "버스", value: 0 },
			{ type: "화물차", value: 0 },
			{ type: "오토바이", value: 0 },
		];
		console.log(TotalData);
		console.log(trafficData);
		TotalData[0].value = trafficData[0]["carAvgSpeed"];
		TotalData[1].value = trafficData[0]["mBusAvgSpeed"];
		TotalData[2].value = trafficData[0]["mTruckAvgSpeed"];
		TotalData[3].value = trafficData[0]["motorAvgSpeed"];

		setData(TotalData);
		setLoading(false);
	};

	var config = {
		data: Data,
		xField: "type",
		yField: "value",
		autoFit: true,
		label: {
			position: "middle",
			style: {
				fill: "#FFFFFF",
				opacity: 0.6,
			},
		},
		meta: {
			type: { alias: "차종" },
			value: { alias: "평균속도" },
		},
	};
	return (
		<>
			{isLoading ? (
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
				<Column {...config} />
			)}
		</>
	);
};
export default GeneralOverSpeed;
