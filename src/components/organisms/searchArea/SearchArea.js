import React from "react";
import { Typography, Switch, Space, Button } from "antd";
import Cascader from "../../atoms/cascader/Cascader";
import DatePicker from "../../atoms/datePicker/DatePicker";
import MultiRadio from "../../molecules/multiRadio/MultiRadio";
// import Switch from "../../atoms/switch/Switch";

import "./style.less";

const { Title } = Typography;
const { Text } = Typography;

const SeachArea = ({ classification, setClassification, period }) => {
	console.log("search area", classification);
	const day = "일간 누적 통계";
	const week = "주간 누적 통계";
	const month = "월간 누적 통계";

	return (
		<div className="search-area">
			<div className="search-area-body">
				<Title level={4} style={{ marginBottom: 25 }}>
					{period === "DAY" ? day : period === "WEEK" ? week : month}
				</Title>
				<div className="search-area-input">
					<Cascader />
					<DatePicker />
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
							+
						</Space>
					</div>
					{period === "WEEK" ? (
						<MultiRadio page={period} />
					) : period === "MONTH" ? (
						<MultiRadio page={period} />
					) : null}
				</div>
			</div>
			<div className="search-area-input-button">
				<Button>전체 다운로드</Button>
			</div>
		</div>
	);
};

export default SeachArea;
