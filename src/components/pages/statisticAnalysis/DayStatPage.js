import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Spin } from "antd";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Header from "../../organisms/header";
import SearchData from "../../organisms/searchData/SearchData";
import Sider from "../../organisms/sider";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import LaneStatistic from "../../organisms/visualStatistic/laneStat/LaneStat";
import TimeStatistic from "../../organisms/visualStatistic/timeStat/TimeStat";
import "../style.less";

const DayStatPage = (props) => {
	const { setLoggedIn, isMaster, setRealFirstFilter } = props;
	const { Content } = Layout;

	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [count, setCount] = useState(false);
	const [emptyErr, setEmptyErr] = useState(false);
	const [futureErr, setFutureErr] = useState(false);

	useEffect(() => {
		setRealFirstFilter(false);
	}, []);

	return (
		<div className="statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "통계 분석", "일간 별"]} />
						<SearchData
							period="DAY"
							classification={timeClassification}
							setClassification={setTimeClassification}
							setStartDate={setStartDate}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
							firstFilter={firstFilter}
							setCount={setCount}
							setLoggedIn={setLoggedIn}
							emptyErr={emptyErr}
							futureErr={futureErr}
							cascaderText="확인을 희망하는 구간을 선택하세요"
						/>
						{firstFilter ? (
							count ? (
								<>
									<GeneralVisualization
										period="DAY"
										page="DAY"
										startDate={startDate}
										endTime={endTime}
										refresh={false}
										setLoggedIn={setLoggedIn}
									/>
									{timeClassification ? (
										<TimeStatistic
											period="DAY"
											startDate={startDate}
											endTime={endTime}
											setLoggedIn={setLoggedIn}
											setEmptyErr={setEmptyErr}
											setFutureErr={setFutureErr}
										/>
									) : (
										<LaneStatistic
											period="DAY"
											startDate={startDate}
											endTime={endTime}
											setLoggedIn={setLoggedIn}
											setEmptyErr={setEmptyErr}
											setFutureErr={setFutureErr}
										/>
									)}
								</>
							) : (
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
							)
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		city: state.location.city,
		district: state.location.district,
		road: state.location.road,
		spot: state.location.spot,
		camera: state.location.camera,
	};
};

export default connect(mapStateToProps)(DayStatPage);
