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
import OverSpeedTable from "../../molecules/StatisticsTable/OverSpeedTable";

import "./style.less";

const SearchCollapsedTable = (props) => {
	const { startDate, endTime, camera, cameraCode, baseURL, trafficURL } = props;
	const { Panel } = Collapse;
	const { Title } = Typography;

	const [trafficTotalData, setTrafficTotalData] = useState([]);
	const [isLoadingTrafficTotal, setLoadingTrafficTotal] = useState(true);
	const [errorMsg, setMsg] = useState(false);

	const [firstData, setFirstData] = useState([]);
	const [seconddData, setSecondData] = useState([]);
	const [overSpeedData, setOverSpeedData] = useState([]);

	const [isLoadingFirst, setLoadingFirst] = useState(true);
	const [isLoadingSecond, setLoadingSecond] = useState(true);
	const [isLoadingOverSpeed, setLoadingOverSpeed] = useState(true);

	useEffect(() => {
		axiosAsync();
	}, [cameraCode, startDate, endTime]);

	const axiosAsync = () => {
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
				setTrafficTotalData(res.data);
				console.log(res.data);
				if (res.data.length !== 0) {
					setMsg(false);
					setLoadingTrafficTotal(false);
				}
			})
			.catch((err) => {
				setMsg(true);
				message.error("최대 31일 조회 가능합니다");
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
				console.log(tableIdx);
			}}
		>
			{tableIdx === "FIRST" ? (
				// !isLoadingFirst && (
				<CSVLink data={firstData}>
					{console.log(firstData)}
					<DownloadOutlined />
					다운로드
				</CSVLink>
			) : // )
			tableIdx === "SECOND" ? (
				<CSVLink data={seconddData}>
					{console.log(seconddData)}
					<DownloadOutlined />
					다운로드
				</CSVLink>
			) : (
				<CSVLink data={overSpeedData}>
					{console.log(overSpeedData)}
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
					{isLoadingTrafficTotal ? (
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
									<FirstTable
										trafficTotalData={trafficTotalData}
										setFirstData={setFirstData}
										setLoadingFirst={setLoadingFirst}
									/>
								</Panel>
								<Panel
									header={collapseHeaderSecond}
									key="2"
									extra={genExtra("SECOND")}
								>
									데이터 형식 미리보기 (5줄까지)
									<SecondTable
										trafficTotalData={trafficTotalData}
										setSecondData={setSecondData}
										setLoadingSecond={setLoadingSecond}
									/>
								</Panel>
								<Panel
									header={collapseHeaderOverSpeed}
									key="3"
									extra={genExtra("OVERSPEED")}
								>
									데이터 형식 미리보기 (5줄까지)
									<OverSpeedTable
										startDate={startDate}
										endTime={endTime}
										page="SEARCH"
										setOverSpeedData={setOverSpeedData}
										setLoadingOverSpeed={setLoadingOverSpeed}
									/>
									);
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
