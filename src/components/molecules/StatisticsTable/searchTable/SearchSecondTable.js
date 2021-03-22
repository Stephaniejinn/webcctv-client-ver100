import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import moment from "moment";

import "../style.less";

const SearchSecondTable = (props) => {
	const { trafficTotalData } = props;

	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);

	var TotalData = [];
	var countCol;

	useEffect(() => {
		countCol = 0;
		setLoading(true);
		parseData();
	}, [trafficTotalData]);

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
	const parseData = () => {
		console.log("count table axios");
		console.log(trafficTotalData);
		trafficTotalData.some((eachData, index) => {
			const {
				recordTime,
				totalVehicleDayNightRatio,
				totalVehiclePeakHourFactor,
				totalVehiclePeakHourConcentrationRatio,
				totalVehiclePeakHourFlowRate,
				carDayNightRatio,
				mBusDayNightRatio,
				mTruckDayNightRatio,
				motorDayNightRatio,
			} = eachData;
			if (recordTime === "ALL") {
				return false;
			}
			if (countCol === 6) {
				return true;
			}
			countCol += 1;

			let dataTemp = {};
			dataTemp["key"] = index + 1;
			dataTemp["time"] = moment(recordTime).format("YYYY년 MM월 DD일 HH:mm:ss");
			dataTemp["totalDayNightRatio"] = totalVehicleDayNightRatio;
			dataTemp["totalPHF"] = totalVehiclePeakHourFactor;
			dataTemp["totalPeekHourCnt"] = totalVehiclePeakHourFlowRate;
			dataTemp[
				"totalVehiclePeakHourConcentrationRatio"
			] = totalVehiclePeakHourConcentrationRatio;

			dataTemp["carDayNightRatio"] = carDayNightRatio;
			dataTemp["busDayNightRatio"] = mBusDayNightRatio;
			dataTemp["truckDayNightRatio"] = mTruckDayNightRatio;
			dataTemp["motorDayNightRatio"] = motorDayNightRatio;
			TotalData.push(dataTemp);
		});

		setData(TotalData);
		setLoading(false);
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
				<Table columns={columns} dataSource={Data} size="small" bordered />
			)}
		</>
	);
};
export default SearchSecondTable;
