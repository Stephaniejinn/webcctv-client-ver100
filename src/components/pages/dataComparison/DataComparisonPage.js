import React, { useState } from "react";
import { Layout } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchComparison from "../../organisms/searchComparison/SearchComparison";
import ComVisualization from "../../organisms/comVisualization/ComVisualization";

const DataComparisonPage = () => {
	const [period, setPeriod] = useState("");
	const { Content } = Layout;

	return (
		<div className="statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["데시보드", "데이터 비교"]} />
						<SearchComparison period={period} setPeriod={setPeriod} />
						<ComVisualization period={period} />
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default DataComparisonPage;
