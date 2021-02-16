import React from "react";
import { Layout, Typography } from "antd";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import RealtimeStatUpper from "../../organisms/realtimeStatUpper/RealtimeStatUpper";
import VideoContainer from "../../organisms/videoStreaming/VideoContainer";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
// import SearchDrawer from "../../molecules/searchDrawer/SearchDrawer";
// import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";

import "./style.less";

const RealtimeStatisticPage = () => {
	const { Content } = Layout;
	// const { Title } = Typography;
	return (
		<div className="realtime-statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						{/* <Breadcrumb
							pageHierarchy={["데시보드", "실시간 데이터"]}
							locationHierarchy={["인천광역시", "중구", "수인사거리1[하행]"]}
						/>
						<div className="page-title-and-search-input">
							<Title level={3} style={{ minWidth: 285 }}>
								실시간 통게 | 수인사거리1
							</Title>
							<div className="search-input-drawer">
								<SearchDrawer />
							</div>
						</div> */}
						<RealtimeStatUpper />
						<div className="realtime-statistic-video-and-graph">
							<VideoContainer camName="camName" httpAddress="address" />
							<div className="realtime-statistic-graph">
								<GeneralVisualization />
							</div>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default RealtimeStatisticPage;
