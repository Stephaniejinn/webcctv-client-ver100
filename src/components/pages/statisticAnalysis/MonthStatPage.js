import React, { useState } from "react";
import { Layout } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import TimeStatistic from "../../organisms/visualStatistic/timeStat/TimeStat";

import "./style.less";

const MonthStatPage = () => {
	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(true);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");

	const { Content } = Layout;

	return (
		<div className="statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "통계 분석", "월간 별"]} />
						<SearchData
							period="MONTH"
							classification={timeClassification}
							setClassification={setTimeClassification}
							setStartDate={setStartDate}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
						/>
						{firstFilter ? (
							<>
								<div className="statistic-general-visualization">
									<GeneralVisualization
										startDate={startDate}
										endTime={endTime}
										timeClassification={timeClassification}
										interval="15M"
									/>
								</div>
								{timeClassification ? (
									<TimeStatistic
										period="MONTH"
										startDate={startDate}
										endTime={endTime}
										timeClassification={timeClassification}
										interval="15M"
									/>
								) : (
									<div>
										<div
											className="site-layout-background"
											style={{ padding: 24, minHeight: 360 }}
										>
											1차 데이터 테이블
										</div>
										<div
											className="site-layout-background"
											style={{ padding: 24, minHeight: 360 }}
										>
											1차 데이터 테이블
										</div>
										<div
											className="site-layout-background"
											style={{ padding: 24, minHeight: 360 }}
										>
											2차 데이터 테이블
										</div>
									</div>
								)}
							</>
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default MonthStatPage;
