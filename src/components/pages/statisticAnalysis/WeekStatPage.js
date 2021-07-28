import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Header from "../../organisms/header";
import SearchData from "../../organisms/searchData/SearchData";
import Sider from "../../organisms/sider";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import LaneStatistic from "../../organisms/visualStatistic/laneStat/LaneStat";
import TimeStatistic from "../../organisms/visualStatistic/timeStat/TimeStat";
import "../style.less";

const WeekStatPage = (props) => {
	const { setLoggedIn, isMaster, setRealFirstFilter } = props;
	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [additionalFilter, setAddFilter] = useState("ALL");
	const [count, setCount] = useState(false);
	const [emptyErr, setEmptyErr] = useState(false);
	const [futureErr, setFutureErr] = useState(false);

	const { Content } = Layout;

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
						<Breadcrumb pageHierarchy={["대시보드", "통계 분석", "주간 별"]} />
						<SearchData
							period="WEEK"
							classification={timeClassification}
							setClassification={setTimeClassification}
							setStartDate={setStartDate}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
							firstFilter={firstFilter}
							setAddFilter={setAddFilter}
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
										period="WEEK"
										page="WEEK"
										startDate={startDate}
										endTime={endTime}
										refresh={false}
										setLoggedIn={setLoggedIn}
									/>
									{timeClassification ? (
										<TimeStatistic
											period="WEEK"
											startDate={startDate}
											endTime={endTime}
											setLoggedIn={setLoggedIn}
											setEmptyErr={setEmptyErr}
											setFutureErr={setFutureErr}
										/>
									) : (
										<LaneStatistic
											period="WEEK"
											startDate={startDate}
											endTime={endTime}
											additionalFilter={additionalFilter}
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

export default WeekStatPage;
