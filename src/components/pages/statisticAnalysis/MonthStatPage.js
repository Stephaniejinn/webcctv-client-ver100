import React, { useState } from "react";
import { Layout, Spin } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import TimeStatistic from "../../organisms/visualStatistic/timeStat/TimeStat";
import LaneStatistic from "../../organisms/visualStatistic/laneStat/LaneStat";

import "./style.less";

const MonthStatPage = (props) => {
	const { setLoggedIn, isMaster } = props;
	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [additionalFilter, setAddFilter] = useState("ALL");
	const [count, setCount] = useState(false);

	const { Content } = Layout;

	return (
		<div className="statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "통계 분석", "월간 별"]} />
						<SearchData
							period="MONTH"
							classification={timeClassification}
							setClassification={setTimeClassification}
							setStartDate={setStartDate}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
							setAddFilter={setAddFilter}
							setCount={setCount}
						/>
						{firstFilter ? (
							count ? (
								<>
									<div className="statistic-general-visualization">
										<GeneralVisualization
											period="MONTH"
											startDate={startDate}
											endTime={endTime}
										/>
									</div>
									{timeClassification ? (
										<TimeStatistic
											period="MONTH"
											startDate={startDate}
											endTime={endTime}
										/>
									) : (
										<LaneStatistic
											period="MONTH"
											startDate={startDate}
											endTime={endTime}
											additionalFilter={additionalFilter}
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

export default MonthStatPage;
