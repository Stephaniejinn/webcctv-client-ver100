import React, { useState, useEffect } from "react";
import { Layout, Tooltip, Typography } from "antd";
import moment from "moment";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import VideoContainer from "../../organisms/videoContainer/StreamingContainer";
import CascaderBtn from "../../atoms/cascaderBtn/CascaderBtn";

import "./style.less";

const RealtimeStreamingPage = (props) => {
	const { setLoggedIn, isMaster } = props;

	const { Content } = Layout;
	const { Title } = Typography;

	const [camNameAdd, setCamNameAdd] = useState({});
	const [isLoadingNameAdd, setLoadingNameAdd] = useState(true);
	const [currNameAdd, setCurrNameAdd] = useState({});
	const [isCurrLoading, setCurrLoading] = useState(true);

	const date = moment(new Date()).format("YYYY-MM-DD");
	const currentTime = moment(new Date()).format("HH:mm:ss");

	var timer;
	const spinTimer = () => {
		setCurrLoading(true);
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			setCurrNameAdd(camNameAdd);
			setCurrLoading(false);
		}, 500);
		return () => clearTimeout(timer);
	};

	useEffect(() => {
		if (!isLoadingNameAdd) {
			spinTimer();
		}
	}, [isLoadingNameAdd]);

	// useEffect(() => {
	// 	// setCurrLoading(true);
	// 	setCurrNameAdd(camNameAdd);
	// 	setCurrLoading(false);
	// }, []);

	return (
		<div className="realtime-streaming-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider setLoggedIn={setLoggedIn} />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "실시간 영상"]} />

						<div className="search-input">
							<Tooltip
								placement="rightBottom"
								title={
									"지정한 구간의 실시간 영상 및 해당 구간의 간략한 정보를 확인 할 수 있습니다"
								}
							>
								<Title level={1} style={{ minWidth: 200, textAlign: "center" }}>
									실시간 영상
								</Title>
							</Tooltip>
							<CascaderBtn
								setCamNameAdd={setCamNameAdd}
								setLoadingNameAdd={setLoadingNameAdd}
								size="large"
								setLoggedIn={setLoggedIn}
								tooltipText="검색을 누르시면 해당 구간의 실시간 영상 페이지로 이동합니다"
								cascaderText="검색 희망하는 구간을 선택하세요"
							/>
						</div>

						<div className="video-container-4">
							{!isCurrLoading &&
								Object.getOwnPropertyNames(currNameAdd).map(function (key) {
									return (
										<VideoContainer
											camName={currNameAdd[key][0]}
											httpAddress={currNameAdd[key][1]}
											date={date}
											currentTime={currentTime}
											realtimeCamCode={key}
											setLoggedIn={setLoggedIn}
										/>
									);
								})}

							{/* {address[0] && (
								<VideoContainer
									camName="수인사거리-1 [하행]"
									httpAddress={address[0]}
									date={date}
									currentTime={currentTime}
									realtimeCamCode="0001"
									setLoggedIn={setLoggedIn}
								/>
							)}
							{address[1] && (
								<VideoContainer
									camName="수인사거리-2 [하행]"
									httpAddress={address[1]}
									date={date}
									currentTime={currentTime}
									realtimeCamCode="0001"
								/>
							)}
							{address[2] && (
								<VideoContainer
									camName="수인사거리-3 [하행]"
									httpAddress={address[2]}
									date={date}
									currentTime={currentTime}
									realtimeCamCode="0001"
								/>
							)} */}
						</div>
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

export default RealtimeStreamingPage;
