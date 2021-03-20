import React from "react";
import { Layout } from "antd";
import moment from "moment";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import VideoContainer from "../../organisms/videoContainer/StreamingContainer";
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
								camName="수인사거리-1 [하행]"
								httpAddress="https://globalbridge.synology.me:4000/m3u8VideoStream.m3u8"
								date={date}
								currentTime={currentTime}
								realtimeCamCode="0004"
							/>
							<VideoContainer
								camName="수인사거리-2 [하행]"
								httpAddress="https://globalbridge.synology.me:4001/m3u8VideoStream.m3u8"
								date={date}
								currentTime={currentTime}
								realtimeCamCode="0004"
							/>
							<VideoContainer
								camName="수인사거리-3 [하행]"
								httpAddress="https://globalbridge.synology.me:4002/m3u8VideoStream.m3u8"
								date={date}
								currentTime={currentTime}
								realtimeCamCode="0004"
							/>
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default RealtimeStreamingPage;
