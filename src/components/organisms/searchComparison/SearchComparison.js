import React from "react";
import { Typography, Select } from "antd";

import Cascader from "../../atoms/cascader/Cascader";
import DatePicker from "../../atoms/datePicker/DatePicker";

import "./style.less";

const { Title } = Typography;
const { Option } = Select;

const SearchComparison = ({ period, setPeriod }) => {
	const handlePeriodChange = (value) => {
		console.log(`selected ${value}`);
		setPeriod(value);
	};

	return (
		<div className="search-comparison-area">
			<div className="search-comparison-area-title">
				<Title style={{ textAlign: "center" }}>구간 통계 데이터 비교</Title>
				<Title level={5} style={{ textAlign: "center" }}>
					특정 기간 내 통계 데이터 시각화 비교
				</Title>
			</div>

			<div className="search-comparison-body">
				<div className="search-area-input">
					<div className="search-comparison-date-picker">
						<Select
							placeholder="기간"
							onChange={handlePeriodChange}
							size="large"
						>
							<Option value="DAY">일간 별</Option>
							<Option value="WEEK">주간 별</Option>
							<Option value="MONTH">월간 별</Option>
						</Select>
						<DatePicker period={period} />
					</div>
					<Cascader size="large" />
				</div>
				<div className="search-area-cascader">
					<Cascader size="large" />
				</div>
			</div>
		</div>
	);
};

export default SearchComparison;