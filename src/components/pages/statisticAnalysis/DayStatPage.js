import React, { useState } from "react";
import { Layout } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import TimeVisualization from "../../organisms/timeVisualization/TimeVisualization";

import "./style.less";

const DayStatPage = () => {
	const [classification, setClassification] = useState(true);

	const { Content } = Layout;

	return (
		<div className="statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["데시보드", "통계 분석", "일간 별"]} />
						<SearchData
							classification={classification}
							setClassification={setClassification}
							period="DAY"
						/>
						<div className="statistic-general-visualization">
							<GeneralVisualization />
						</div>
						{classification ? (
							<>
								<TimeVisualization period="DAY" />
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
							</>
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
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default DayStatPage;
