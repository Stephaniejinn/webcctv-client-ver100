import React, { useEffect, useState } from "react";
import { Collapse, Typography, Divider, Spin, message } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import { CSVLink } from "react-csv";
import moment from "moment";

import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import FirstTable from "../../molecules/StatisticsTable/searchTable/SearchFirstTable";
import SecondTable from "../../molecules/StatisticsTable/searchTable/SearchSecondTable";
import SearchOverSpeedTable from "../../molecules/StatisticsTable/searchTable/SearchOverSpeed";

import "./style.less";

const SearchCollapsedTable = (props) => {
	const { startDate, endTime, camera, cameraCode, baseURL, trafficURL } = props;
	const { Panel } = Collapse;
	const { Title } = Typography;

	const [errorMsg, setMsg] = useState(false);

	const [firstData, setFirstData] = useState([]);
	const [secondData, setSecondData] = useState([]);
	const [overSpeedData, setOverSpeedData] = useState([]);

	const [firstDataTotal, setFirstDataTotal] = useState([]);
	const [secondDataTotal, setSecondDataTotal] = useState([]);
	const [overSpeedDataTotal, setOverSpeedDataTotal] = useState([]);

	const [isLoadingFirst, setLoadingFirst] = useState(true);
	const [isLoadingSecond, setLoadingSecond] = useState(true);
	const [isLoadingOverSpeed, setLoadingOverSpeed] = useState(true);

	var firstDataParsed = [];
	var secondDataParsed = [];
	var OverSpeedParsed = [];
	var countCol;
	var countOverSpeedCol;

	useEffect(() => {
		countCol = 0;
		countOverSpeedCol = 0;
		setLoadingFirst(true);
		setLoadingSecond(true);
		axiosAsyncFS();
		axiosOverSpeedData();
	}, [cameraCode, startDate, endTime]);

	const axiosAsyncFS = () => {
		axios
			.get(
				`${baseURL}${trafficURL}/daily?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=time&laneNumber=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
					setMsg(false);
					res.data.some((eachData, index) => {
						const {
							recordTime,
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
							pedestrianVolume,
							jaywalkVolume,
							totalVehicleDayNightRatio,
							totalVehiclePeakHourFactor,
							totalVehiclePeakHourConcentrationRatio,
							totalVehiclePeakHourFlowRate,
							carDayNightRatio,
							mBusDayNightRatio,
							mTruckDayNightRatio,
							motorDayNightRatio,
						} = eachData;
						let firstDataTemp = {};
						let secondDataTemp = {};

						if (recordTime === "ALL") {
							return false;
						}
						if (countCol === 6) {
							setFirstData(firstDataParsed);
							setSecondData(secondDataParsed);
						}
						countCol += 1;

						firstDataTemp["key"] = index + 1;
						firstDataTemp["time"] = moment(recordTime).format(
							"YYYY년 MM월 DD일 HH:mm:ss"
						);

						firstDataTemp["totalCount"] = totalVehicleVolume;
						firstDataTemp["totalAvgSpeed"] = totalVehicleAvgSpeed;
						firstDataTemp["totalpcu"] = totalVehiclePassengerCarUnit;
						firstDataTemp["totalOverSpeed"] = totalVehicleSpdVolume;

						firstDataTemp["carCount"] = carVolume;
						firstDataTemp["carAvgSpeed"] = carAvgSpeed;
						firstDataTemp["carpcu"] = carPassengerCarUnit;
						firstDataTemp["carRatio"] = carVehicleRatio;
						firstDataTemp["carOverSpeed"] = carSpdVolume;

						firstDataTemp["busCount"] = mBusVolume;
						firstDataTemp["busAvgSpeed"] = mBusAvgSpeed;
						firstDataTemp["buspcu"] = mBusPassengerCarUnit;
						firstDataTemp["busRatio"] = mBusVehicleRatio;
						firstDataTemp["busOverSpeed"] = mBusSpdVolume;

						firstDataTemp["truckCount"] = mTruckVolume;
						firstDataTemp["truckAvgSpeed"] = mTruckAvgSpeed;
						firstDataTemp["truckpcu"] = mTruckPassengerCarUnit;
						firstDataTemp["truckRatio"] = mTruckVehicleRatio;
						firstDataTemp["truckOverSpeed"] = mTruckSpdVolume;

						firstDataTemp["motorCount"] = motorVolume;
						firstDataTemp["motorAvgSpeed"] = motorAvgSpeed;
						firstDataTemp["motorpcu"] = motorPassengerCarUnit;
						firstDataTemp["motorRatio"] = motorVehicleRatio;
						firstDataTemp["motorOverSpeed"] = motorSpdVolume;
						firstDataTemp["person"] = pedestrianVolume;
						firstDataTemp["jaywalk"] = jaywalkVolume;

						secondDataTemp["key"] = index + 1;
						secondDataTemp["time"] = moment(recordTime).format(
							"YYYY년 MM월 DD일 HH:mm:ss"
						);
						secondDataTemp["totalDayNightRatio"] = totalVehicleDayNightRatio;
						secondDataTemp["totalPHF"] = totalVehiclePeakHourFactor;
						secondDataTemp["totalPeekHourCnt"] = totalVehiclePeakHourFlowRate;
						secondDataTemp[
							"totalVehiclePeakHourConcentrationRatio"
						] = totalVehiclePeakHourConcentrationRatio;

						secondDataTemp["carDayNightRatio"] = carDayNightRatio;
						secondDataTemp["busDayNightRatio"] = mBusDayNightRatio;
						secondDataTemp["truckDayNightRatio"] = mTruckDayNightRatio;
						secondDataTemp["motorDayNightRatio"] = motorDayNightRatio;

						firstDataParsed.push(firstDataTemp);
						secondDataParsed.push(secondDataTemp);
					});
					setFirstDataTotal(firstDataParsed);
					setSecondDataTotal(secondDataParsed);
					setLoadingFirst(false);
					setLoadingSecond(false);
				}
			})
			.catch((err) => {
				setMsg(true);
				message.error("최대 31일 조회 가능합니다");
				console.log(err);
			});
	};
	const axiosOverSpeedData = () => {
		axios
			.get(
				`${baseURL}/violations/speeding/records?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				res.data.forEach((eachData, index) => {
					const {
						recordTime,
						vehicleType,
						licenseNumber,
						speed,
						imageLink,
					} = eachData;
					let overSpeedDataTemp = {};

					if (countOverSpeedCol === 5) {
						setOverSpeedData(OverSpeedParsed);
					}
					countOverSpeedCol += 1;

					overSpeedDataTemp["key"] = index;
					overSpeedDataTemp["time"] = moment(recordTime).format(
						"YYYY년 MM월 DD일 HH:mm:ss"
					);

					overSpeedDataTemp["vehicleType"] = vehicleType;
					overSpeedDataTemp["licenseNumber"] = licenseNumber;
					overSpeedDataTemp["speed"] = speed;
					overSpeedDataTemp["imageLink"] = imageLink;
					OverSpeedParsed.push(overSpeedDataTemp);
				});
				setOverSpeedDataTotal(OverSpeedParsed);
				setLoadingOverSpeed(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const collapseHeaderFirst = (
		<div className="table-collapse-header">
			1차 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 및 특정 차선 데이터 <Divider type="vertical" />
			15분 단위
		</div>
	);

	const collapseHeaderSecond = (
		<div className="table-collapse-header">
			2차 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 데이터 <Divider type="vertical" />
			하루 단위
		</div>
	);
	const collapseHeaderOverSpeed = (
		<div className="table-collapse-header">
			과속 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 데이터
		</div>
	);
	const genExtra = (tableIdx) => (
		<div
			onClick={(event) => {
				// If you don't want click extra trigger collapse, you can prevent this:
				event.stopPropagation();
			}}
		>
			{tableIdx === "FIRST" ? (
				<CSVLink data={firstDataTotal}>
					<DownloadOutlined />
					다운로드
				</CSVLink>
			) : tableIdx === "SECOND" ? (
				<CSVLink data={secondDataTotal}>
					<DownloadOutlined />
					다운로드
				</CSVLink>
			) : (
				<CSVLink data={overSpeedDataTotal}>
					<DownloadOutlined />
					다운로드
				</CSVLink>
			)}
		</div>
	);

	return (
		<>
			{errorMsg ? null : (
				<div className="table-collapse">
					<Title level={5} style={{ marginTop: 10 }}>
						{camera} 데이터 조회 결과
					</Title>
					<Divider />
					{isLoadingSecond ? (
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
						<>
							<Collapse
								accordion
								expandIconPosition="right"
								expandIcon={({ isActive }) => (
									// <EyeOutlined style={{ fontSize: 16, marginTop: -2 }} />
									<div style={{ fontSize: 14, marginTop: -2 }}>
										<EyeOutlined />
										미리보기
									</div>
								)}
							>
								<Panel
									header={collapseHeaderFirst}
									key="1"
									extra={genExtra("FIRST")}
								>
									데이터 형식 미리보기 (5줄까지)
									{isLoadingFirst ? (
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
										<>
											<FirstTable firstData={firstData} />
										</>
									)}
								</Panel>
								<Panel
									header={collapseHeaderSecond}
									key="2"
									extra={genExtra("SECOND")}
								>
									데이터 형식 미리보기 (5줄까지)
									{isLoadingSecond ? (
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
										<SecondTable secondData={secondData} />
									)}
								</Panel>
								<Panel
									header={collapseHeaderOverSpeed}
									key="3"
									extra={genExtra("OVERSPEED")}
								>
									데이터 형식 미리보기 (5줄까지)
									{isLoadingOverSpeed ? (
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
										<SearchOverSpeedTable overSpeedData={overSpeedData} />
									)}
								</Panel>
							</Collapse>
						</>
					)}
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		camera: state.location.camera,
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
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
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchCollapsedTable);
