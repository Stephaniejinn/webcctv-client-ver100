import React, { useEffect } from "react";
import { Collapse, Typography, Divider } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import "./style.less";

const SearchCollapsedTable = (props) => {
	const { startDate, endTime, camera, cameraCode, baseURL } = props;
	const { Panel } = Collapse;
	const { Title } = Typography;

	const collapseHeaderFirst = (
		<div className="table-collapse-header">
			1차 데이터
			{/* <Divider type="vertical" />
			{camera} */}
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 및 특정 차선 데이터 <Divider type="vertical" />
			15분 단위
		</div>
	);

	const collapseHeaderSecond = (
		<div className="table-collapse-header">
			2차 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 데이터 <Divider type="vertical" />
			15분 단위
		</div>
	);
	const collapseHeaderOverSpeed = (
		<div className="table-collapse-header">
			과속 데이터
			<Divider type="vertical" />
			{moment(startDate).format("LL")} ~ {moment(endTime).format("LL")}
			<Divider type="vertical" />
			전체 데이터 <Divider type="vertical" />
			15분 단위
		</div>
	);
	const genExtra = () => (
		<div
			onClick={(event) => {
				// If you don't want click extra trigger collapse, you can prevent this:
				event.stopPropagation();
			}}
		>
			<DownloadOutlined />
			다운로드
		</div>
	);

	return (
		<div className="table-collapse">
			<Title level={5} style={{ marginTop: 10 }}>
				{camera} 데이터 조회 결과
			</Title>
			<Divider />
			<Collapse
				accordion
				expandIconPosition="right"
				expandIcon={({ isActive }) => (
					// <EyeOutlined style={{ fontSize: 16, marginTop: -2 }} />
					<div style={{ fontSize: 14, marginTop: -2 }}>
						<EyeOutlined />
						미리보기
					</div>
				)}
			>
				<Panel header={collapseHeaderFirst} key="1" extra={genExtra()}>
					<p>text</p>
				</Panel>
				<Panel header={collapseHeaderSecond} key="2" extra={genExtra()}>
					<p>text</p>
				</Panel>
				<Panel header={collapseHeaderOverSpeed} key="3" extra={genExtra()}>
					<p>text</p>
				</Panel>
			</Collapse>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
		baseURL: state.baseURL.baseURL,
		camera: state.location.camera,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		// getLocationCodeInfo: () => {
		// 	dispatch(actions.getLocationCode());
		// },
		// getBaseURL: () => {
		// 	dispatch(actions.getURL());
		// },
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchCollapsedTable);
