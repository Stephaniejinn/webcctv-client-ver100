import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";

import "../style.less";

const WTFirstTable = (props) => {
	const { trafficTotalData } = props;

	const [Data, setData] = useState([]);
	const [isLoading, setLoading] = useState(true);
	const WeekKey = {
		SUN: "일요일",
		MON: "월요일",
		TUE: "화요일",
		WED: "수요일",
		THU: "목요일",
		FRI: "금요일",
		SAT: "토요일",
		ALL: "전체",
		DAY: "평일전체",
		END: "주말전체",
	};
	var TotalData = [];

	useEffect(() => {
		setLoading(true);
		setData([]);
		axiosData();
	}, [trafficTotalData]);

	const columns = [
		{
			title: "시간",
			dataIndex: "time",
			key: "time",
			width: 67,
			textWrap: "word-break",
			ellipsis: true,
		},
		{
			title: "전체",
			dataIndex: "Total",
			key: "Total",
			children: [
				{
					title: "통행량(대)",
					dataIndex: "totalCount",
					key: "totalCount",
				},
				{
					title: "평균속도(km/h)",
					dataIndex: "totalAvgSpeed",
					key: "totalAvgSpeed",
				},
				{
					title: "PCU",
					dataIndex: "totalpcu",
					key: "totalpcu",
				},
				{
					title: "과속(대)",
					dataIndex: "totalOverSpeed",
					key: "totalOverSpeed",
				},
			],
		},
		{
			title: "승용차",
			key: "car",
			children: [
				{
					title: "통행량(대)",
					dataIndex: "carCount",
					key: "carCount",
				},
				{
					title: "평균속도(km/h)",
					dataIndex: "carAvgSpeed",
					key: "carAvgSpeed",
				},
				{
					title: "PCU",
					dataIndex: "carpcu",
					key: "carpcu",
				},
				{
					title: "비율(%)",
					dataIndex: "carRatio",
					key: "carRatio",
				},
				{
					title: "과속(대)",
					dataIndex: "carOverSpeed",
					key: "carOverSpeed",
				},
			],
		},
		{
			title: "버스",
			key: "bus",
			children: [
				{
					title: "통행량(대)",
					dataIndex: "busCount",
					key: "busCount",
				},
				{
					title: "평균속도(km/h)",
					dataIndex: "busAvgSpeed",
					key: "busAvgSpeed",
				},
				{
					title: "PCU",
					dataIndex: "buspcu",
					key: "buspcu",
				},
				{
					title: "비율(%)",
					dataIndex: "busRatio",
					key: "busRatio",
				},
				{
					title: "과속(대)",
					dataIndex: "busOverSpeed",
					key: "busOverSpeed",
				},
			],
		},
		{
			title: "화물차",
			key: "truck",
			children: [
				{
					title: "통행량(대)",
					dataIndex: "truckCount",
					key: "truckCount",
				},
				{
					title: "평균속도(km/h)",
					dataIndex: "truckAvgSpeed",
					key: "truckAvgSpeed",
				},
				{
					title: "PCU",
					dataIndex: "truckpcu",
					key: "truckpcu",
				},
				{
					title: "비율(%)",
					dataIndex: "truckRatio",
					key: "truckRatio",
				},
				{
					title: "과속(대)",
					dataIndex: "truckOverSpeed",
					key: "truckOverSpeed",
				},
			],
		},
		{
			title: "오토바이",
			key: "motor",
			children: [
				{
					title: "통행량(대)",
					dataIndex: "motorCount",
					key: "motorCount",
				},
				{
					title: "평균속도(km/h)",
					dataIndex: "motorAvgSpeed",
					key: "motorAvgSpeed",
				},
				{
					title: "PCU",
					dataIndex: "motorpcu",
					key: "motorpcu",
				},
				{
					title: "비율(%)",
					dataIndex: "motorRatio",
					key: "motorRatio",
				},
				{
					title: "과속(대)",
					dataIndex: "motorOverSpeed",
					key: "motorOverSpeed",
				},
			],
		},
	];

	const axiosData = () => {
		trafficTotalData.forEach((eachData, index) => {
			const {
				weekOption,
				totalVehicleVolume,
				totalVehicleAvgSpeed,
				totalVehiclePassengerCarUnit,
				totalVehicleSpdVolume,
				carVolume,
				carAvgSpeed,
				carPassengerCarUnit,
				carVehicleRatio,
				carSpdVolume,
				mBusVolume,
				mBusAvgSpeed,
				mBusPassengerCarUnit,
				mBusVehicleRatio,
				mBusSpdVolume,
				mTruckVolume,
				mTruckAvgSpeed,
				mTruckPassengerCarUnit,
				mTruckVehicleRatio,
				mTruckSpdVolume,
				motorVolume,
				motorAvgSpeed,
				motorPassengerCarUnit,
				motorVehicleRatio,
				motorSpdVolume,
			} = eachData;
			let dataTemp = {};

			dataTemp["key"] = index + 1;
			dataTemp["time"] = WeekKey[weekOption];

			dataTemp["totalCount"] = totalVehicleVolume;
			dataTemp["totalAvgSpeed"] = totalVehicleAvgSpeed;
			dataTemp["totalpcu"] = totalVehiclePassengerCarUnit;
			dataTemp["totalOverSpeed"] = totalVehicleSpdVolume;

			dataTemp["carCount"] = carVolume;
			dataTemp["carAvgSpeed"] = carAvgSpeed;
			dataTemp["carpcu"] = carPassengerCarUnit;
			dataTemp["carRatio"] = carVehicleRatio;
			dataTemp["carOverSpeed"] = carSpdVolume;

			dataTemp["busCount"] = mBusVolume;
			dataTemp["busAvgSpeed"] = mBusAvgSpeed;
			dataTemp["buspcu"] = mBusPassengerCarUnit;
			dataTemp["busRatio"] = mBusVehicleRatio;
			dataTemp["busOverSpeed"] = mBusSpdVolume;

			dataTemp["truckCount"] = mTruckVolume;
			dataTemp["truckAvgSpeed"] = mTruckAvgSpeed;
			dataTemp["truckpcu"] = mTruckPassengerCarUnit;
			dataTemp["truckRatio"] = mTruckVehicleRatio;
			dataTemp["truckOverSpeed"] = mTruckSpdVolume;

			dataTemp["motorCount"] = motorVolume;
			dataTemp["motorAvgSpeed"] = motorAvgSpeed;
			dataTemp["motorpcu"] = motorPassengerCarUnit;
			dataTemp["motorRatio"] = motorVehicleRatio;
			dataTemp["motorOverSpeed"] = motorSpdVolume;
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
				<Table
					columns={columns}
					dataSource={Data}
					size="small"
					pagination={{ hideOnSinglePage: true }}
					bordered
				/>
			)}
		</>
	);
};
export default WTFirstTable;
