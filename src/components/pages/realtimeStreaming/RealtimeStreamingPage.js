import React from "react";
import { Layout } from "antd";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import VideoContainer from "../../organisms/videoStreaming/VideoContainer";
import SearchInput from "../../atoms/cascaderBtn/CascaderBtn";

import "./style.less";

const RealtimeStreamingPage = () => {
	const { Content } = Layout;

	return (
		<div className="realtime-streaming-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb
							pageHierarchy={["데시보드", "실시간 영상"]}
							locationHierarchy={[""]}
						/>
						<div className="search-input">
							<SearchInput />
						</div>
						<div className="video-container-4">
							<VideoContainer
								camName="camName"
								httpAddress="address"
								page="STREAMING"
							/>
							<VideoContainer
								camName="camName"
								httpAddress="address"
								page="STREAMING"
							/>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default RealtimeStreamingPage;
