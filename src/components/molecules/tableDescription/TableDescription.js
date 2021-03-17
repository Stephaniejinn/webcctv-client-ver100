import React from "react";
import { Typography, Divider } from "antd";
import moment from "moment";
import "moment-timezone";

import { connect } from "react-redux";
import * as actions from "../../../actions";

import "./style.less";

const TableDescription = (props) => {
	const {
		period,
		tableKey,
		startDate,
		endTime,
		camera,
		currentTime,
		timeClassification,
		page = "",
	} = props;

	const { Title, Text } = Typography;

	// const group = timeClassification ? "시간별" : "차선별";
	const periodText =
		period === "DAY" ? "일간" : period === "WEEK" ? "주간" : "월간";
	const dataTypeText =
		tableKey === "first" ? "1차" : tableKey === "second" ? "2차" : "과속 ";
	return (
		<div className="table-description">
			{page === "REALSTATISTIC" ? (
				<Title level={5}> 실시간 통계 데이터</Title>
			) : tableKey === "overSpeed" ? (
				<Title level={5}>
					{periodText} {dataTypeText} 데이터
				</Title>
			) : (
				<Title level={5}>
					{periodText} 누적 통계 {dataTypeText} 데이터 분석
				</Title>
			)}
			<Divider />
			<Text>
				{period === "DAY" ? (
					page === "REALSTATISTIC" ? (
						<>
							{camera}
							<Divider type="vertical" />
							{moment(startDate).format("YYYY년 MM월 DD일")} {currentTime}
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
