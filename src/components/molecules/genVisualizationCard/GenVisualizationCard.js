import React from "react";
import { Card } from "antd";

const GeneralGraphCard = ({ title, chart }) => {
	return <Card title={title}>{chart}</Card>;
};
export default GeneralGraphCard;
