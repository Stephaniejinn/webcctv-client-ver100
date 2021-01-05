import React from "react";
import { Typography, Switch, Space, Button } from "antd";
import Cascader from "../../atoms/cascader/Cascader";
import DatePicker from "../../atoms/datePicker/DatePicker";
// import Switch from "../../atoms/switch/Switch";

import "./style.less";

const { Title } = Typography;
const { Text } = Typography;

const SeachArea = ({ classification, setClassification }) => {
	console.log("search area", classification);
	return (
		<div className="search-area">
			<div className="search-area-body">
				<Title level={4} style={{ marginBottom: 25 }}>
					일간 누적 통계
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
						</Space>
						{/* <Switch
						label="시간별 기준"
						checkState={classification}
						setClassification={setClassification}
						classification={classification}
					/>
					<Switch
						label="차설별 기준"
						checkState={!classification}
						setClassification={setClassification}
						classification={!classification}
					/> */}
					</div>
				</div>
			</div>
			<div className="search-area-input-button">
				<Button>전체 다운로드</Button>
			</div>
		</div>
	);
};

export default SeachArea;
