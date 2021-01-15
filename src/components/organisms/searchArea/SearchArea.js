import React from "react";
import { Typography, Switch, Space, Button, Select } from "antd";
import Cascader from "../../atoms/cascader/Cascader";
import DatePicker from "../../atoms/datePicker/DatePicker";
import MultiRadio from "../../molecules/multiRadio/MultiRadio";
// import Switch from "../../atoms/switch/Switch";

import "./style.less";

const { Title } = Typography;
const { Text } = Typography;
const { Option } = Select;

const SeachArea = ({
	classification,
	setClassification,
	searchUnit,
	setSearchUnit,
	period,
}) => {
	const day = "일간 누적 통계";
	const week = "주간 누적 통계";
	const month = "월간 누적 통계";
	const search = "기간 별 데이터 조회";

	const handleSelectChange = (value) => {
		console.log(`selected ${value}`);
		setSearchUnit(value);
	};

	return (
		<div className="search-area">
			<Title level={4} style={{ marginBottom: 25 }}>
				{period === "DAY"
					? day
					: period === "WEEK"
					? week
					: period === "MONTH"
					? month
					: search}
			</Title>
			<div className="search-area-body">
				<div className="search-area-input">
					<Cascader />
					<DatePicker period={period} />
					<div className="search-area-switch">
						<Space>
							<Text strong style={{ marginRight: 1 }}>
								시간별 기준
							</Text>
							<Switch
								defaultChecked={classification}
								checked={classification}
								onChange={(checked) => setClassification(checked)}
							/>
						</Space>
						<Space>
							<Text strong style={{ marginRight: 1 }}>
								차선별 기준
							</Text>
							<Switch
								defaultChecked={!classification}
								checked={!classification}
								onChange={(checked) => setClassification(!checked)}
							/>
						</Space>
					</div>
					{period === "SEARCH" ? (
						<Select
							placeholder="조회 단위 시간 선택"
							onChange={handleSelectChange}
						>
							<Option value="15">15분 단위</Option>
							<Option value="60">1시간 단위</Option>
						</Select>
					) : (
						classification === false &&
						(period === "WEEK" ? (
							<MultiRadio page={period} />
						) : period === "MONTH" ? (
							<MultiRadio page={period} />
						) : null)
					)}
				</div>
				<div className="search-area-input-button">
					<Button type="primary" style={{ marginBottom: 10 }}>
						조회
					</Button>
					<Button>전체 다운로드</Button>
				</div>
			</div>
		</div>
	);
};

export default SeachArea;
