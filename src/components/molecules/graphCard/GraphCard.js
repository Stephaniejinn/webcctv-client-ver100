import React from "react";
import { Typography, Divider } from "antd";

const GraphCard = (props) => {
	const { Graph, xAxis, yAxis } = props;

	const { Text } = Typography;

	return (
		<div className="chart-vertical">
			<div className="chart-horizontal">
				<div className="chart-y-divider">
					<Divider type="vertical" />
					<Text
						strong
						style={{
							verticalAlign: "middle",
							marginTop: "5px",
							marginBottom: "5px",
						}}
					>
						{yAxis}
					</Text>
					<Divider type="vertical" />
				</div>

				{Graph}
			</div>
			<div className="chart-x-divider">
				<Divider>
					<Text strong style={{ fontSize: 14 }}>
						{xAxis}
					</Text>
				</Divider>
			</div>
		</div>
	);
};

export default GraphCard;
