import React from "react";
import { Card, Typography } from "antd";

const GeneralGraphCard = ({ title, chart, axisInfo, yAxis }) => {
	const { Text } = Typography;
	return (
		<>
			{chart ? (
				<Card title={title}>
					{axisInfo && (
						<div style={{ marginTop: -10 }}>
							<Text style={{ fontSize: 12 }}>{yAxis}</Text>
						</div>
					)}
					{chart}
				</Card>
			) : (
				<Card title={title}>
					<div
						style={{
							marginTop: 20,
							marginBottom: 20,
							textAlign: "center",
							paddingTop: 30,
							paddingBottom: 30,
						}}
					>
						<Text>현재 해당 카메라 데이터가 없습니다</Text>
					</div>
				</Card>
			)}
		</>
	);
};
export default GeneralGraphCard;
