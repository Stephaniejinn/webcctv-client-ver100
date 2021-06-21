import React, { useState, useEffect } from "react";
import { Layout, Typography } from "antd";
import { connect } from "react-redux";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import OverspeedTable from "../../molecules/StatisticsTable/OverSpeedTable";
import NotificationButton from "../../atoms/notificationButton/NotificationButton";

import "./style.less";

const OverspeedPage = (props) => {
	const { camera, setLoggedIn, isMaster, setRealFirstFilter } = props;

	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [count, setCount] = useState(false);
	const [isRefresh, setRefresh] = useState(false);

	const { Content } = Layout;
	const { Title, Paragraph, Text } = Typography;
	const descriptionText = (
		<>
			<Paragraph>
				해당 구간에서 발생한 과속 차량에 대한 정보가 표시됩니다
			</Paragraph>
			<Paragraph>표시정보:</Paragraph>
			<Paragraph>
				<ul>
					<li>
						<Text>과속 탐지 시간</Text>
					</li>
					<li>
						<Text>차량 번호</Text>
					</li>
					<li>
						<Text>위반 속도</Text>
					</li>
					<li>
						<Text>위반 차선</Text>
					</li>
					<li>
						<Text>차종</Text>
					</li>
					<li>
						<Text>과속 차량 이미지</Text>
					</li>
				</ul>
			</Paragraph>
		</>
	);

	useEffect(() => {
		setRealFirstFilter(false);
	}, []);

	return (
		<div className="page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header setLoggedIn={setLoggedIn} isMaster={isMaster} />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "과속 데이터 조회"]} />
						<SearchData
							period="OVERSPEED"
							classification={timeClassification}
							setClassification={setTimeClassification}
							startDate={startDate}
							setStartDate={setStartDate}
							endTime={endTime}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
							setCount={setCount}
							setLoggedIn={setLoggedIn}
							setRefresh={setRefresh}
							cascaderText="확인을 희망하는 구간을 선택하세요"
						/>
						{firstFilter ? (
							<>
								<div className="table-title-text">
									<Title
										level={5}
										style={{
											marginTop: 0,
											marginBottom: 0,
											textAlign: "center",
										}}
									>
										{camera}
									</Title>
									<NotificationButton description={descriptionText} />
								</div>
								<OverspeedTable
									startDate={startDate}
									endTime={endTime}
									setLoggedIn={setLoggedIn}
									isRefresh={isRefresh}
									setRefresh={setRefresh}
								/>
							</>
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		camera: state.location.camera,
	};
};

export default connect(mapStateToProps)(OverspeedPage);
