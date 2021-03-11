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
	// const date = moment(new Date()).format("YYYY-MM-DD");
	const date = "2020-03-11";

	// const { Title } = Typography;
	return (
		<div className="realtime-statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<RealtimeStatUpper />
						<div className="realtime-statistic-video-and-graph">
							<VideoContainer camName="camName" httpAddress="address" />
							<div className="realtime-statistic-graph">
								<GeneralVisualization
									startDate={date}
									endTime={date}
									timeClassification={true}
								/>
							</div>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default RealtimeStatisticPage;
