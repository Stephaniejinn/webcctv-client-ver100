import React from "react";
import { Typography, Divider } from "antd";
import NotificationButton from "../../atoms/notificationButton/NotificationButton";

import moment from "moment";
import "moment-timezone";

import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import "./style.less";

const TableDescription = (props) => {
	const {
		period,
		tableKey,
		startDate,
		endTime,
		camera,
		currentTime,
		page = "",
	} = props;

	const { Title, Text, Paragraph } = Typography;

	const periodText =
		period === "DAY" ? "일간" : period === "WEEK" ? "주간" : "월간";
	const dataTypeText =
		tableKey === "first" ? "1차" : tableKey === "second" ? "2차" : "과속 ";
	const statDescriptionText = (
		<>
			<Paragraph>
				{periodText} 누적 통계 누적 교통 정보의 대한 {dataTypeText} 가공
				데이터의 정보가 표시됩니다.
			</Paragraph>
			<Paragraph>표시정보:</Paragraph>
			{tableKey === "first" ? (
				<Paragraph>
					<ul>
						<li>
							<Text>교통량</Text>
						</li>
						<li>
							<Text>평균속도</Text>
						</li>
						<li>
							<Text>PCU</Text>
						</li>
						<li>
							<Text>차종비율</Text>
						</li>

						<li>
							<Text>과속차량 수</Text>
						</li>
					</ul>
					<Paragraph>*항목별 상세사항은 매뉴얼에 기재 됨</Paragraph>
				</Paragraph>
			) : tableKey === "second" ? (
				<Paragraph>
					<ul>
						<li>
							<Text>주간 (07:00 ~ 19:00) 통행량</Text>
						</li>
						<li>
							<Text>야간 (19:00 ~ 익일 07:00) 통행량</Text>
						</li>
						<li>
							<Text>주야율</Text>
						</li>
						<li>
							<Text>PHF</Text>
						</li>
						<li>
							<Text>첨두시간</Text>
						</li>
						<li>
							<Text>첨두유율</Text>
						</li>
						<li>
							<Text>집중율</Text>
						</li>
					</ul>
					<Paragraph>*항목별 상세사항은 매뉴얼에 기재 됨</Paragraph>
				</Paragraph>
			) : (
				<Paragraph>
					<ul>
						<li>
							<Text>교통량</Text>
						</li>
					</ul>
					<Paragraph>*항목별 상세사항은 매뉴얼에 기재 됨</Paragraph>
				</Paragraph>
			)}
		</>
	);
	const realtimeDescriptionText = (
		<>
			<Paragraph>
				해당 표시 구간에 대한 전체 및 차종 별 실시간 통계 데이터를 표시합니다
			</Paragraph>
			<Paragraph>표시정보:</Paragraph>
			<Paragraph>
				<ul>
					<li>
						<Text>교통량</Text>
					</li>
					<li>
						<Text>PCU</Text>
					</li>

					<li>
						<Text>차종비율</Text>
					</li>

					<li>
						<Text>과속차량 수</Text>
					</li>
				</ul>
			</Paragraph>
		</>
	);
	var timeCalc;
	if (page === "REALSTATISTIC") {
		let curTime = moment(new Date()).format("YYYY-MM-DD HH");
		let nearest15 = Math.floor(currentTime.minute() / 15) * 15;
		timeCalc = moment(
			curTime + `:${nearest15 === 0 ? "00" : nearest15}:00`
		).format("HH:mm");
	}

	return (
		<div className="table-description">
			{page === "REALSTATISTIC" ? (
				<div className="table-title-text">
					<Title level={5}> 실시간 통계 데이터</Title>
					<NotificationButton description={realtimeDescriptionText} />
				</div>
			) : tableKey === "overSpeed" ? (
				<Title level={5}>
					{periodText} {dataTypeText} 데이터
				</Title>
			) : (
				<div className="table-title-text">
					<Title level={5} style={{ textAlign: "center" }}>
						{periodText} 누적 통계 {dataTypeText} 데이터 분석
					</Title>
					<NotificationButton description={statDescriptionText} />
				</div>
			)}
			<Divider />
			<Text>
				{period === "DAY" ? (
					page === "REALSTATISTIC" ? (
						<>
							{camera.length === 0 ? "수인사거리-1 [하행]" : camera}
							<Divider type="vertical" />
							{moment(startDate).format("YYYY년 MM월 DD일")}
							<Divider type="vertical" />
							00:00 ~ {timeCalc}
						</>
					) : (
						<>
							{dataTypeText} 데이터 <Divider type="vertical" /> {camera}
							<Divider type="vertical" />
							{moment(startDate).format("YYYY년 MM월 DD일")}
						</>
					)
				) : (
					<>
						{dataTypeText} 데이터 <Divider type="vertical" /> {camera}
						<Divider type="vertical" />
						{moment(startDate).format("YYYY년 MM월 DD일")} ~{" "}
						{moment(endTime).format("YYYY년 MM월 DD일")}
					</>
				)}
			</Text>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		camera: state.location.camera,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationInfo: () => {
			dispatch(actions.getLocation());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(TableDescription);
