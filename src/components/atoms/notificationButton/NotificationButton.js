import React from "react";
import { Button, notification } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const NotificationButton = (props) => {
	const { message, description } = props;

	const openNotification = () => {
		notification.open({
			message: message,
			description: description,
			icon: <InfoCircleOutlined style={{ color: "#27335c", fontSize: 20 }} />,
			duration: 3.5,
		});
	};
	return (
		<>
			<Button
				shape="circle"
				type="text"
				icon={<InfoCircleOutlined />}
				// style={{ marginLeft: 5 }}
				onClick={openNotification}
			/>
		</>
	);
};

export default NotificationButton;
