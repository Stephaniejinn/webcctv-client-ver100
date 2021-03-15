import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../../actions";

import "../style.less";

const DTFisrtTable = (props) => {
	const {
		currentLaneNum,
		startDate,
		endTime,
		currentTime = "23:59:59",
		interval,
		cameraCode,
		baseURL,
	} = props;

	const [Data, setData] = useState([]);
	var FirstRow = {
		key: 0,
		time: "전체",
		totalCount: 0,
		totalAvgSpeed: 0,
		totalpcu: 0,
		totalOverSpeed: 0,

		carCount: 0,
		carAvgSpeed: 0,
		carpcu: 0,
		carRatio: 0,
		carOverSpeed: 0,

		busCount: 0,
		busAvgSpeed: 0,
		buspcu: 0,
		busRatio: 0,
		busOverSpeed: 0,

		truckCount: 0,
		truckAvgSpeed: 0,
		truckpcu: 0,
		truckRatio: 0,
		truckOverSpeed: 0,

		motorCount: 0,
		motorAvgSpeed: 0,
		motorpcu: 0,
		motorRatio: 0,
		motorOverSpeed: 0,

		person: 0,
		jaywalk: 0,
	};

	var TotalData = [];

	useEffect(() => {
		axiosData();
	}, [currentLaneNum]);

	var columns;
	if (currentLaneNum === 0) {
		columns = [
			{
				title: "시간",
				dataIndex: "time",
			},
			{
				title: "전체",
				dataIndex: "Total",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "totalCount",
						key: "count",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "totalAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "totalpcu",
						key: "pcu",
					},
					{
						title: "과속(대)",
						dataIndex: "totalOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "승용차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "carCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "carAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "carpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "carRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "carOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "버스",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "busCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "busAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "buspcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "busRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "busOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "화물차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "truckCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "truckAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "truckpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "truckRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "truckOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "이륜차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "motorCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "motorAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "motorpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "motorRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "motorOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "보행자",
				children: [
					{
						title: "수(명)",
						dataIndex: "person",
						key: "carCount",
					},
					{
						title: "무단횡단(명)",
						dataIndex: "jaywalk",
						key: "avgSpeed",
					},
				],
			},
		];
	} else {
		columns = [
			{
				title: "시간",
				dataIndex: "time",
			},
			{
				title: "전체",
				dataIndex: "Total",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "totalCount",
						key: "count",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "totalAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "totalpcu",
						key: "pcu",
					},
					{
						title: "과속(대)",
						dataIndex: "totalOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "승용차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "carCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "carAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "carpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "carRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "carOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "버스",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "busCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "busAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "buspcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "busRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "busOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "화물차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "truckCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "truckAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "truckpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "truckRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "truckOverSpeed",
						key: "overSpeed",
					},
				],
			},
			{
				title: "이륜차",
				children: [
					{
						title: "통행량(대)",
						dataIndex: "motorCount",
						key: "carCount",
					},
					{
						title: "평균속도(km/h)",
						dataIndex: "motorAvgSpeed",
						key: "avgSpeed",
					},
					{
						title: "PCU",
						dataIndex: "motorpcu",
						key: "pcu",
					},
					{
						title: "비율(%)",
						dataIndex: "motorRatio",
						key: "ratio",
					},
					{
						title: "과속(대)",
						dataIndex: "motorOverSpeed",
						key: "overSpeed",
					},
				],
			},
		];
	}

	const axiosData = () => {
		axios
			.get(
				`${baseURL}/statistics/traffic/first?groupBy=time&interval=${interval}&camCode=0004&startDate=${startDate}&endTime=${endTime} ${currentTime}&laneNumber=${currentLaneNum}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				console.log("count table axios");
				res.data.forEach((eachData, index) => {
					const {
						recordTime,
						carCnt,
						carAvgSpeed,
						carPCU,
						carRatio,
						carSpdCnt,
						mBusCnt,
						mBusAvgSpeed,
						mBusPCU,
						mBusRatio,
						mBusSpdCnt,
						mTruckCnt,
						mTruckAvgSpeed,
						mTruckPCU,
						mTruckRatio,
						mTruckSpdCnt,
						motorCnt,
						motorAvgSpeed,
						motorPCU,
						motorRatio,
						motorSpdCnt,
						pedestrianCnt,
						jaywalkCnt,
					} = eachData;
					let dataTemp = {};
					let totalCnt = carCnt + mBusCnt + mTruckCnt + motorCnt;

					let carAvgSpeedNum = parseFloat(carAvgSpeed);
					let mBusAvgSpeedNum = parseFloat(mBusAvgSpeed);
					let mTruckAvgSpeedNum = parseFloat(mTruckAvgSpeed);
					let motorAvgSpeedNum = parseFloat(motorAvgSpeed);

					let carPCUNum = parseFloat(carPCU);
					let mBusPCUNum = parseFloat(mBusPCU);
					let mTruckPCUNum = parseFloat(mTruckPCU);
					let motorPCUNum = parseFloat(motorPCU);

					let totalAvgSpeed = parseFloat(
						(
							(carAvgSpeedNum +
								mBusAvgSpeedNum +
								mTruckAvgSpeedNum +
								motorAvgSpeedNum) /
							4
						).toFixed(2)
					);
					let totalpcu = parseFloat(
						(carPCUNum + mBusPCUNum + mTruckPCUNum + motorPCUNum).toFixed(1)
					);
					let totalOverSpeed =
						carSpdCnt + mBusSpdCnt + mTruckSpdCnt + motorSpdCnt;
					dataTemp["key"] = index + 1;
					dataTemp["time"] = moment(recordTime).format("HH:mm");
					dataTemp["totalCount"] = totalCnt;
					dataTemp["totalAvgSpeed"] = totalAvgSpeed;
					dataTemp["totalpcu"] = totalpcu;
					dataTemp["totalOverSpeed"] = totalOverSpeed;

					dataTemp["carCount"] = carCnt;
					dataTemp["carAvgSpeed"] = carAvgSpeedNum;
					dataTemp["carpcu"] = carPCU;
					dataTemp["carRatio"] = carRatio;
					dataTemp["carOverSpeed"] = carSpdCnt;

					dataTemp["busCount"] = mBusCnt;
					dataTemp["busAvgSpeed"] = mBusAvgSpeedNum;
					dataTemp["buspcu"] = mBusPCU;
					dataTemp["busRatio"] = mBusRatio;
					dataTemp["busOverSpeed"] = mBusSpdCnt;

					dataTemp["truckCount"] = mTruckCnt;
					dataTemp["truckAvgSpeed"] = mTruckAvgSpeedNum;
					dataTemp["truckpcu"] = mTruckPCU;
					dataTemp["truckRatio"] = mTruckRatio;
					dataTemp["truckOverSpeed"] = mTruckSpdCnt;

					dataTemp["motorCount"] = motorCnt;
					dataTemp["motorAvgSpeed"] = motorAvgSpeedNum;
					dataTemp["motorpcu"] = motorPCU;
					dataTemp["motorRatio"] = motorRatio;
					dataTemp["motorOverSpeed"] = motorSpdCnt;
					if (currentLaneNum === 0) {
						dataTemp["person"] = pedestrianCnt;
						dataTemp["jaywalk"] = jaywalkCnt;

						FirstRow["person"] += pedestrianCnt;
						FirstRow["jaywalk"] += jaywalkCnt;
					}

					TotalData.push(dataTemp);
					FirstRow["totalCount"] += totalCnt;
					FirstRow["totalAvgSpeed"] += totalAvgSpeed;
					FirstRow["totalpcu"] += totalpcu;
					FirstRow["totalOverSpeed"] += totalOverSpeed;

					FirstRow["carCount"] += carCnt;
					FirstRow["carAvgSpeed"] += carAvgSpeedNum;
					FirstRow["carpcu"] += carPCUNum;
					FirstRow["carOverSpeed"] += carSpdCnt;

					FirstRow["busCount"] += mBusCnt;
					FirstRow["busAvgSpeed"] += mBusAvgSpeedNum;
					FirstRow["buspcu"] += mBusPCUNum;
					FirstRow["busOverSpeed"] += mBusSpdCnt;

					FirstRow["truckCount"] += mTruckCnt;
					FirstRow["truckAvgSpeed"] += mTruckAvgSpeedNum;
					FirstRow["truckpcu"] += mTruckPCUNum;
					FirstRow["truckOverSpeed"] += mTruckSpdCnt;

					FirstRow["motorCount"] += motorCnt;
					FirstRow["motorAvgSpeed"] += motorAvgSpeedNum;
					FirstRow["motorpcu"] += motorPCUNum;
					FirstRow["motorOverSpeed"] += motorSpdCnt;
				});
				FirstRow["totalAvgSpeed"] = (FirstRow["totalAvgSpeed"] / 96).toFixed(2);
				FirstRow["carAvgSpeed"] = (FirstRow["carAvgSpeed"] / 96).toFixed(2);
				FirstRow["busAvgSpeed"] = (FirstRow["busAvgSpeed"] / 96).toFixed(2);
				FirstRow["truckAvgSpeed"] = (FirstRow["truckAvgSpeed"] / 96).toFixed(2);
				FirstRow["motorAvgSpeed"] = (FirstRow["motorAvgSpeed"] / 96).toFixed(2);

				FirstRow["carRatio"] = (
					FirstRow["carCount"] / FirstRow["totalCount"]
				).toFixed(2);
				FirstRow["busRatio"] = (
					FirstRow["busCount"] / FirstRow["totalCount"]
				).toFixed(2);
				FirstRow["truckRatio"] = (
					FirstRow["truckCount"] / FirstRow["totalCount"]
				).toFixed(2);
				FirstRow["motorRatio"] = (
					FirstRow["motorCount"] / FirstRow["totalCount"]
				).toFixed(2);

				FirstRow["totalpcu"] = FirstRow["totalpcu"].toFixed(1);
				FirstRow["carpcu"] = FirstRow["carpcu"].toFixed(1);
				FirstRow["buspcu"] = FirstRow["buspcu"].toFixed(1);
				FirstRow["truckpcu"] = FirstRow["truckpcu"].toFixed(1);
				FirstRow["motorpcu"] = FirstRow["motorpcu"].toFixed(1);

				const arr = [FirstRow];
				const dataWithTotal = arr.concat(TotalData);
				setData(dataWithTotal);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return <Table columns={columns} dataSource={Data} size="small" bordered />;
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationCodeInfo: () => {
			dispatch(actions.getLocationCode());
		},
		getBaseURL: () => {
			dispatch(actions.getURL());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(DTFisrtTable);
