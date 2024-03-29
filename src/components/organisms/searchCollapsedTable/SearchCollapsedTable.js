import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ExportJsonExcel from "js-export-excel";
import moment from "moment";
import { Collapse, Typography, Divider, Spin, message, Tooltip } from "antd";
import {
	EyeOutlined,
	DownloadOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";

import FirstTable from "../../molecules/StatisticsTable/searchTable/SearchFirstTable";
import SecondTable from "../../molecules/StatisticsTable/searchTable/SearchSecondTable";
import SearchOverSpeedTable from "../../molecules/StatisticsTable/searchTable/SearchOverSpeed";
import "./style.less";

const SearchCollapsedTable = (props) => {
	const {
		startDate,
		endTime,
		camera,
		cameraCode,
		baseURL,
		trafficURL,
		setLoggedIn,
		camLanes,
		setEmptyErr,
		setFutureErr,
		setOver31Err,
	} = props;
	const { Panel } = Collapse;
	const { Title, Text } = Typography;

	const [errorMsg, setMsg] = useState(false);

	const [firstData, setFirstData] = useState([]);
	const [secondData, setSecondData] = useState([]);
	const [overSpeedData, setOverSpeedData] = useState([]);

	const [firstDataTotal, setFirstDataTotal] = useState([]);
	const [secondDataTotal, setSecondDataTotal] = useState([]);
	const [overSpeedDataTotal, setOverSpeedDataTotal] = useState([]);
	const [firstDataLaneTotal, setFirstDataLaneTotal] = useState({});

	const [isLoadingFirst, setLoadingFirst] = useState(true);
	const [isLoadingSecond, setLoadingSecond] = useState(true);
	const [isLoadingOverSpeed, setLoadingOverSpeed] = useState(true);
	const [isLoadingLane, setLoadingLane] = useState(true);

	const [isEmptyTrafficData, setEmptyTrafficData] = useState(false);
	const [isEmptyOverSpeedData, setEmptyOverSpeedData] = useState(false);

	var countFirstCol;
	var countSecondCol;
	var countOverSpeedCol;
	var firstDataLaneTotalTemp;
	const firstDataHeaders = [
		"시간",
		"전체 통행량",
		"전체 평균속도",
		"전체 PCU",
		"전체 과속대수",
		"승용차 통행량",
		"승용차 평균속도",
		"승용차 PCU",
		"승용차 비율",
		"승용차 과속대수",
		"버스 통행량",
		"버스 평균속도",
		"버스 PCU",
		"버스 비율",
		"버스 과속대수",
		"화물차 통행량",
		"화물차 평균속도",
		"화물차 PCU",
		"화물차 비율",
		"화물차 과속대수",
		"오토바이 통행량",
		"오토바이 평균속도",
		"오토바이 PCU",
		"오토바이 비율",
		"오토바이 과속대수",
	];
	const firstDataFilter = [
		"time",
		"totalCount",
		"totalAvgSpeed",
		"totalpcu",
		"totalOverSpeed",
		"carCount",
		"totalAvgSpeed",
		"carpcu",
		"carRatio",
		"carOverSpeed",
		"busCount",
		"busAvgSpeed",
		"buspcu",
		"busRatio",
		"busOverSpeed",
		"truckCount",
		"truckAvgSpeed",
		"truckpcu",
		"truckRatio",
		"truckOverSpeed",
		"motorCount",
		"motorAvgSpeed",
		"motorpcu",
		"motorRatio",
		"motorOverSpeed",
	];
	const tableTitleTooltip = (
		<>
			<p>표시정보:</p>
			<p>1차 데이터: 통행량, 평균속도, PCU, 과속</p>
			<p>2차 데이터: 주야율, PHF, 첨두유율, 집중율</p>
			<p>
				과속 데이터: 과속 탐지 시간, 차량 번호, 위반 속도, 위반 차선, 차종, 과속
				차량 이미지
			</p>
		</>
	);
	useEffect(() => {
		countFirstCol = 0;
		countSecondCol = 0;
		countOverSpeedCol = 0;
		firstDataLaneTotalTemp = {};
		setEmptyTrafficData(false);
		setEmptyOverSpeedData(false);
		setLoadingFirst(true);
		setLoadingSecond(true);
		setLoadingOverSpeed(true);
		setFirstData([]);
		setSecondData([]);
		setFirstDataTotal([]);
		setSecondDataTotal([]);
		axiosAsyncFS();
		axiosOverSpeedData();
		for (var idx = 1; idx <= camLanes; idx++) {
			axiosAsyncFirstLane(idx);
		}
	}, [cameraCode, startDate, endTime]);

	const downloadOverSpeedToExcel = () => {
		let excelFile = {};
		excelFile.fileName = `과속 데이터_${moment(startDate).format("l")}-${moment(
			endTime
		).format("l")}`;
		excelFile.datas = [
			{
				sheetData: overSpeedDataTotal,
				sheetName: "전체",
				sheetFilter: [
					"time",
					"vehicleType",
					"licenseNumber",
					"speed",
					"laneNumber",
					"imageLink",
				],
				sheetHeader: [
					"시간",
					"차종",
					"차량번호",
					"위반속도",
					"차선",
					"이미지 링크",
				],
			},
		];
		let toExcel = new ExportJsonExcel(excelFile);
		toExcel.saveExcel();
	};
	const downloadSecondTableToExcel = () => {
		let excelFile = {};
		excelFile.fileName = `2차 데이터_${moment(startDate).format("l")}-${moment(
			endTime
		).format("l")}`;
		excelFile.datas = [
			{
				sheetData: secondDataTotal,
				sheetName: "전체",
				sheetFilter: [
					"time",
					"totalPHF",
					"totalPeekHourCnt",
					"totalVehiclePeakHourConcentrationRatio",
					"totalDayNightRatio",
					"carDayNightRatio",
					"busDayNightRatio",
					"truckDayNightRatio",
					"motorDayNightRatio",
				],
				sheetHeader: [
					"시간",
					"PHF",
					"점두유율",
					"집중율",
					"전체 주야율",
					"승용차 주야율",
					"버스 주야율",
					"화물차 주야율",
					"오토바이 주야율",
				],
			},
		];
		let toExcel = new ExportJsonExcel(excelFile);
		toExcel.saveExcel();
	};

	const downloadFirstTableToExcel = () => {
		let excelFile = {};
		excelFile.fileName = `1차 데이터_${moment(startDate).format("l")}-${moment(
			endTime
		).format("l")}`;
		let Datas = [
			{
				sheetData: firstDataTotal,
				sheetName: "전체",
				sheetFilter: firstDataFilter,
				sheetHeader: firstDataHeaders,
			},
		];
		if (!isLoadingLane) {
			for (var idx = 1; idx <= camLanes; idx++) {
				// axiosAsyncFirstLane(idx);
				Datas.push({
					sheetData: firstDataLaneTotal[idx],
					sheetName: `${idx} 차선`,
					sheetFilter: firstDataFilter,
					sheetHeader: firstDataHeaders,
				});
				if (idx === camLanes) {
					excelFile.datas = Datas;
					let toExcel = new ExportJsonExcel(excelFile);
					toExcel.saveExcel();
				}
			}
		}
	};
	const axiosAsyncFS = () => {
		var firstDataParsedTotal = [];
		var secondDataParsedTotal = [];
		var firstDataParsed = [];
		var secondDataParsed = [];
		axios
			.get(
				`${baseURL}${trafficURL}/daily?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=time&laneNumber=0`,
				{
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
							totalVehicleDayNightRatio,
							totalVehiclePeakHourFactor,
							totalVehiclePeakHourConcentrationRatio,
							totalVehiclePeakHourFlowRate,
							carDayNightRatio,
							mBusDayNightRatio,
							mTruckDayNightRatio,
							motorDayNightRatio,
							totalVehiclePeakHourTime,
						} = eachData;
						let firstDataTemp = {};
						let secondDataTemp = {};

						if (recordTime === "ALL") {
							secondDataTemp["key"] = index + 1;
							secondDataTemp["time"] = moment(totalVehiclePeakHourTime).format(
								"YYYY년 MM월 DD일"
							);
							secondDataTemp["totalDayNightRatio"] = totalVehicleDayNightRatio;
							secondDataTemp["totalPHF"] = totalVehiclePeakHourFactor;
							secondDataTemp["totalPeekHourCnt"] = totalVehiclePeakHourFlowRate;
							secondDataTemp["totalVehiclePeakHourConcentrationRatio"] =
								totalVehiclePeakHourConcentrationRatio;

							secondDataTemp["carDayNightRatio"] = carDayNightRatio;
							secondDataTemp["busDayNightRatio"] = mBusDayNightRatio;
							secondDataTemp["truckDayNightRatio"] = mTruckDayNightRatio;
							secondDataTemp["motorDayNightRatio"] = motorDayNightRatio;
							secondDataParsedTotal.push(secondDataTemp);

							if (countSecondCol < 5) {
								countSecondCol += 1;
								secondDataParsed.push(secondDataTemp);
							}
							if (countSecondCol === 5) {
								setSecondData(secondDataParsed);
							}
						} else {
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

							firstDataParsedTotal.push(firstDataTemp);
							if (countFirstCol < 5) {
								countFirstCol += 1;
								firstDataParsed.push(firstDataTemp);
							}
							if (countFirstCol === 5) {
								setFirstData(firstDataParsed);
							}
						}
					});
					if (secondData.length === 0) {
						setSecondData(secondDataParsed);
					}
					setFirstDataTotal(firstDataParsedTotal);
					setSecondDataTotal(secondDataParsedTotal);
					setLoadingFirst(false);
					setLoadingSecond(false);
					setEmptyErr(false);
					setFutureErr(false);
					setOver31Err(false);
				} else {
					setEmptyTrafficData(true);
					setEmptyErr(true);
					setFutureErr(false);
					message.warning("해당 기간 데이터가 없습니다");
				}
			})
			.catch((err) => {
				setMsg(true);
				if (err.response.status === 400) {
					setEmptyErr(false);
					setFutureErr(true);
					if (
						err.response.data.payload[0].msg ===
						"Must be at most 31 days after startDate"
					) {
						setOver31Err(true);
						message.warning("최대 31일까지 조회 할 수 있습니다");
					} else {
						setOver31Err(false);
						message.warning("분석이 완료되지 않은 기간에 대한 검색입니다");
					}
				} else if (err.response.status === 401) {
					message.warning(
						"로그인 정보가 유효하지 않습니다. 다시 로그인해주세요"
					);
					setLoggedIn(false);
				}
				setEmptyTrafficData(true);
			});
	};
	const axiosOverSpeedData = () => {
		setOverSpeedData([]);
		setOverSpeedDataTotal([]);
		var OverSpeedParsedTotal = [];
		var OverSpeedParsed = [];
		axios
			.get(
				`${baseURL}/violations/speeding/records?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&limit=0&offset=0`,
				{
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
					setMsg(false);
					res.data.forEach((eachData, index) => {
						const {
							recordTime,
							vehicleType,
							licenseNumber,
							speed,
							imageLink,
							laneNumber,
						} = eachData;
						let overSpeedDataTemp = {};

						overSpeedDataTemp["key"] = index;
						overSpeedDataTemp["time"] = moment(recordTime).format(
							"YYYY년 MM월 DD일 HH:mm:ss"
						);

						overSpeedDataTemp["vehicleType"] = vehicleType;
						overSpeedDataTemp["licenseNumber"] = licenseNumber;
						overSpeedDataTemp["speed"] = speed;
						overSpeedDataTemp["laneNumber"] = `${laneNumber} 차선`;

						overSpeedDataTemp["imageLink"] = imageLink;
						OverSpeedParsedTotal.push(overSpeedDataTemp);
						if (countOverSpeedCol < 5) {
							countOverSpeedCol += 1;
							OverSpeedParsed.push(overSpeedDataTemp);
							setOverSpeedData(OverSpeedParsed);
						}
					});
					setOverSpeedDataTotal(OverSpeedParsedTotal);
					setLoadingOverSpeed(false);
				} else {
					setMsg(true);
					setEmptyOverSpeedData(true);
					message.warning("해당 기간 과속 데이터가 없습니다");
				}
			})
			.catch((err) => {
				setMsg(true);
				setEmptyOverSpeedData(true);
				if (err.response.status === 400) {
					if (
						err.response.data.payload[0].msg ===
						"Must be at most 31 days after startDate"
					) {
						message.warning(
							"최대 31일까지의 과속 데이터를 조회 할 수 있습니다"
						);
					} else {
						message.warning(
							"분석이 완료되지 않은 기간에 대한 과속 데이터 검색입니다"
						);
					}
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
			});
	};
	const axiosAsyncFirstLane = (laneNum) => {
		setLoadingLane(true);
		var firstDataLane = [];
		axios
			.get(
				`${baseURL}${trafficURL}/daily?camCode=${cameraCode}&startDate=${startDate}&endTime=${endTime} 23:59:59&axis=time&laneNumber=${laneNum.toString()}`,
				{
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
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
						} = eachData;
						let laneDataTemp = {};
						if (recordTime === "ALL") {
							return false;
						} else {
							laneDataTemp["key"] = index + 1;
							laneDataTemp["time"] = moment(recordTime).format(
								"YYYY년 MM월 DD일 HH:mm:ss"
							);

							laneDataTemp["totalCount"] = totalVehicleVolume;
							laneDataTemp["totalAvgSpeed"] = totalVehicleAvgSpeed;
							laneDataTemp["totalpcu"] = totalVehiclePassengerCarUnit;
							laneDataTemp["totalOverSpeed"] = totalVehicleSpdVolume;

							laneDataTemp["carCount"] = carVolume;
							laneDataTemp["carAvgSpeed"] = carAvgSpeed;
							laneDataTemp["carpcu"] = carPassengerCarUnit;
							laneDataTemp["carRatio"] = carVehicleRatio;
							laneDataTemp["carOverSpeed"] = carSpdVolume;

							laneDataTemp["busCount"] = mBusVolume;
							laneDataTemp["busAvgSpeed"] = mBusAvgSpeed;
							laneDataTemp["buspcu"] = mBusPassengerCarUnit;
							laneDataTemp["busRatio"] = mBusVehicleRatio;
							laneDataTemp["busOverSpeed"] = mBusSpdVolume;

							laneDataTemp["truckCount"] = mTruckVolume;
							laneDataTemp["truckAvgSpeed"] = mTruckAvgSpeed;
							laneDataTemp["truckpcu"] = mTruckPassengerCarUnit;
							laneDataTemp["truckRatio"] = mTruckVehicleRatio;
							laneDataTemp["truckOverSpeed"] = mTruckSpdVolume;

							laneDataTemp["motorCount"] = motorVolume;
							laneDataTemp["motorAvgSpeed"] = motorAvgSpeed;
							laneDataTemp["motorpcu"] = motorPassengerCarUnit;
							laneDataTemp["motorRatio"] = motorVehicleRatio;
							laneDataTemp["motorOverSpeed"] = motorSpdVolume;
							firstDataLane.push(laneDataTemp);
						}
					});
					firstDataLaneTotalTemp[laneNum] = firstDataLane;
					setFirstDataLaneTotal(firstDataLaneTotalTemp);
					if (laneNum === camLanes) {
						setLoadingLane(false);
					}
				} else {
					setEmptyTrafficData(true);
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					setLoggedIn(false);
				}
			});
	};
	const collapseHeaderFirst = (
		<div className="table-collapse-header">
			1차 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 및 특정 차선 데이터 <Divider type="vertical" />
			15분 단위 <Divider type="vertical" />
		</div>
	);

	const collapseHeaderSecond = (
		<div className="table-collapse-header">
			2차 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 데이터 <Divider type="vertical" />
			하루 단위 <Divider type="vertical" />
		</div>
	);
	const collapseHeaderOverSpeed = (
		<div className="table-collapse-header">
			과속 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 데이터 <Divider type="vertical" />
		</div>
	);
	const genExtra = (tableIdx) => (
		<div
			onClick={(event) => {
				event.stopPropagation();
				if (tableIdx === "FIRST") {
					downloadFirstTableToExcel();
				} else if (tableIdx === "SECOND") {
					downloadSecondTableToExcel();
				} else {
					downloadOverSpeedToExcel();
				}
			}}
		>
			<Tooltip
				placement="topLeft"
				title="다운로드 버튼을 클릭하여 해당하는 데이터를 엑셀 파일로 다운받을 수 있습니다"
			>
				<DownloadOutlined />
				다운로드
			</Tooltip>
		</div>
	);

	return (
		<>
			{errorMsg ? null : isEmptyTrafficData ? null : (
				<div className="table-collapse">
					<div className="table-title-text">
						<Title level={5} style={{ marginTop: 10 }}>
							{camera} 데이터 조회 결과
						</Title>
						<Tooltip placement="topLeft" title={tableTitleTooltip}>
							<InfoCircleOutlined style={{ marginLeft: 5 }} />
						</Tooltip>
					</div>
					<Divider />
					{isLoadingSecond || isLoadingLane ? (
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
									<Tooltip
										placement="topLeft"
										title="미리보기 버튼을 클릭하여 각 차종 별 데이터를 개별적으로 표 형식으로 해당 페이지에서 5줄까지 미리 볼 수 있습니다"
									>
										<div style={{ fontSize: 14, marginTop: -2 }}>
											<EyeOutlined />
											미리보기
										</div>
									</Tooltip>
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
									{isEmptyOverSpeedData ? (
										<Text strong type="danger">
											해당 기간 과속 데이터가 없습니다
										</Text>
									) : isLoadingOverSpeed ? (
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
											데이터 형식 미리보기 (5줄까지)
											<SearchOverSpeedTable
												overSpeedData={overSpeedData}
												isEmptyOverSpeedData={isEmptyOverSpeedData}
											/>
										</>
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
		camLanes: state.locationCode.camLanes,
	};
};

export default connect(mapStateToProps)(SearchCollapsedTable);
