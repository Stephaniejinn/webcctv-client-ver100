import React, { useEffect, useState } from "react";
import { Layout, message, Typography, Button } from "antd";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import StatContainer from "../../organisms/videoContainer/StatContainer";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import TimeTableCard from "../../molecules/tableCard/TimeTableCard";
import CascaderBtn from "../../atoms/cascaderBtn/CascaderBtn";

import "./style.less";

const RealtimeStatisticPage = (props) => {
	const {
		baseURL,
		trafficURL,
		city,
		district,
		road,
		spot,
		camera,
		camAddress,
		cameraCode,
		setLoggedIn,
		isMaster,
	} = props;
	const { Content } = Layout;
	const { Title } = Typography;
	const history = useHistory();

	const [trafficTotalData, setTrafficTotalData] = useState([]);
	const [isEmptyData, setEmptyData] = useState(false);
	const [currTime, setCurrTime] = useState(
		moment(new Date()).subtract(1, "second")
	);
	const [refresh, setRefresh] = useState(false);
	const [firstFilter, setFirstFilter] = useState(false);
	const [locationHierarchy, setLocationHierarchy] = useState([]);
	const [pageTitle, setPageTitle] = useState("실시간 통계");

	const date = moment(new Date()).format("YYYY-MM-DD");

	useEffect(() => {
		if (cameraCode !== "") {
			setEmptyData(false);
			setTrafficTotalData([]);
			axiosAsync();
			setFirstFilter(true);
			setLocationHierarchy([city, district, road, spot]);
			setPageTitle(`실시간 통계 | ${camera} 카메라`);
		}
	}, [cameraCode, currTime, refresh]);

	// useEffect(() => {
	// 	if (refresh) {
	// 		setEmptyData(false);
	// 		setTrafficTotalData([]);
	// 		axiosAsync();
	// 	}
	// }, [refresh]);

	const axiosAsync = () => {
		axios
			.get(
				`${baseURL}${trafficURL}/daily?camCode=${cameraCode}&startDate=${date}&endTime=${date} ${currTime.format(
					"HH:mm:ss"
				)}&axis=time&laneNumber=0`,
				{
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.length !== 0) {
					console.log("test refresh", refresh);
					setTrafficTotalData(res.data);
					setEmptyData(false);
					if (refresh) {
						message.success("새로고침 성공");
					}
				} else {
					setEmptyData(true);
				}
				setRefresh(false);
			})
			.catch((err) => {
				setEmptyData(true);
				setRefresh(false);
				console.log(err.response);
				if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				} else if (err.response.status === 404) {
					message.warning("해당 기간 시간 별 데이터가 없습니다");
				} else if (err.response.status === 400) {
					message.warning("분석이 완료되지 않은 기간에 대한 검색입니다");
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
			});
	};
	const handleRefresh = () => {
		const currNewDate = new Date();
		if (
			currTime.hour() === currNewDate.getHours() &&
			Math.floor(currTime.minute() / 15) * 15 ===
				Math.floor(moment(currNewDate).minute() / 15) * 15
		) {
			message.success("새로운 데이터가 없습니다");
		} else {
			setCurrTime(moment(new Date()));
			setRefresh(true);
		}
	};
	return (
		<div className="realtime-statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb
							pageHierarchy={["대시보드", "실시간 데이터"]}
							locationHierarchy={locationHierarchy}
						/>
						<Title level={3} style={{ minWidth: 450, marginBottom: 0 }}>
							{pageTitle}
						</Title>
						<div className="page-search">
							<CascaderBtn
								setLoggedIn={setLoggedIn}
								size="middle"
								setFirstFilter={setFirstFilter}
								page="REALSTATISTIC"
							/>
							{firstFilter && (
								<Button onClick={handleRefresh} style={{ marginTop: 0 }}>
									새로고침
								</Button>
							)}
						</div>
						{firstFilter ? (
							<>
								<div className="realtime-statistic-video-and-graph">
									<StatContainer camName={camera} httpAddress={camAddress} />
									<div className="realtime-statistic-graph">
										<GeneralVisualization
											page="REALSTATISTIC"
											period="DAY"
											startDate={date}
											endTime={date}
											currentTime={currTime.format("HH:mm:ss")}
											refresh={refresh}
											setLoggedIn={setLoggedIn}
										/>
									</div>
								</div>
								<TimeTableCard
									period="DAY"
									page="REALSTATISTIC"
									tableKey="first"
									currentLaneNum="0"
									trafficTotalData={trafficTotalData}
									startDate={date}
									endTime={date}
									currentTime={currTime}
									isEmptyData={isEmptyData}
								/>
							</>
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
		trafficURL: state.baseURL.trafficURL,
		city: state.location.city,
		district: state.location.district,
		road: state.location.road,
		spot: state.location.spot,
		camera: state.location.camera,
		camAddress: state.locationCode.camAddress,
		cameraCode: state.locationCode.cameraCode,
	};
};

export default connect(mapStateToProps)(RealtimeStatisticPage);
