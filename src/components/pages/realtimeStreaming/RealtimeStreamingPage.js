import React from "react";
import { Layout } from "antd";
import moment from "moment";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import VideoContainer from "../../organisms/videoStreaming/VideoContainer";
import SearchInput from "../../atoms/cascaderBtn/CascaderBtn";

import "./style.less";

const RealtimeStreamingPage = () => {
	const { Content } = Layout;

	// const date = moment(new Date()).format("YYYY-MM-DD");
	const currentTime = moment(new Date()).format("HH:mm:ss");

	const date = "2020-03-11";

	return (
		<div className="realtime-streaming-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "실시간 영상"]} />
						<div className="search-input">
							<SearchInput />
						</div>
						<div className="video-container-4">
							<VideoContainer
								page="STREAMING"
								camName="수인사거리-1 [하행]"
								httpAddress="http://globalbridge3.iptime.org:4000/videos/output.m3u8"
								date={date}
								currentTime={currentTime}
								realtimeCamCode="0001"
							/>
							<VideoContainer
								page="STREAMING"
								camName="수인사거리-2 [하행]"
								httpAddress="http://globalbridge3.iptime.org:4001/videos/output.m3u8"
								date={date}
								currentTime={currentTime}
								realtimeCamCode="0002"
							/>
							<VideoContainer
								page="STREAMING"
								camName="수인사거리-3 [하행]"
								httpAddress="http://globalbridge3.iptime.org:4002/videos/output.m3u8"
								date={date}
								currentTime={currentTime}
								realtimeCamCode="0003"
							/>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default RealtimeStreamingPage;
