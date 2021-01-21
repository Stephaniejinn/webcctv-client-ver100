import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment-timezone";

import { Layout, Typography } from "antd";

import Avatar from "../../molecules/avatar/Avatar";

import "./style.less";

const { Header } = Layout;
const { Text } = Typography;

const MyHeader = () => {
	const [currentTime, setCurrentTime] = useState(
		moment(new Date()).format("YYYY년 MM월 DD일 HH:mm:ss")
	);

	useEffect(() => {
		const intv = setInterval(() => {
			setCurrentTime(moment(new Date()).format("YYYY년 MM월 DD일 HH:mm:ss"));
		}, 1000);

		return () => {
			clearInterval(intv);
		};
	}, []);

	return (
		<Header className="site-layout-background" style={{ padding: 0 }}>
			<Text type="secondary" style={{ marginRight: 10 }}>
				{currentTime}
			</Text>
			<Avatar />
		</Header>
	);
};

export default MyHeader;
