import React from "react";
import { Collapse, Typography, Divider, Button } from "antd";
import { EyeOutlined, DownloadOutlined } from "@ant-design/icons";

import "./style.less";

const SearchCollapsedTable = () => {
	const { Panel } = Collapse;
	const { Title } = Typography;

	const collapseHeader = (
		<div className="table-collapse-header">
			1차 데이터
			<Divider type="vertical" />
			수인사거리1[하행]
			<Divider type="vertical" />
			2020년 1월 1월 ~ 2020년 1월 12일
			<Divider type="vertical" />
			구간 전체 시간별 데이터 <Divider type="vertical" />
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
	// var expandButton = <Button type="text" icon={<EyeOutlined />}> 미리보기</Button>;
	// console.log(typeof expandButton);

	return (
		<div className="table-collapse">
			<Title level={5} style={{ marginTop: 10 }}>
				데이터 조회 결과
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
				<Panel header={collapseHeader} key="1" extra={genExtra()}>
					<p>text</p>
				</Panel>
				<Panel header={collapseHeader} key="2" extra={genExtra()}>
					<p>text</p>
				</Panel>
				<Panel header={collapseHeader} key="3" extra={genExtra()}>
					<p>text</p>
				</Panel>
			</Collapse>
		</div>
	);
};

export default SearchCollapsedTable;
