import React from "react";
// import axios from "axios";
import { Form, Input, message, Button } from "antd";
import { BankOutlined, UserOutlined } from "@ant-design/icons";

import Cascader from "../../atoms/cascader/Cascader";

// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { isLoginState } from "../../../states/app";
// import { userInfoState } from "../../../states/ui";
// import { CHANGE_PASSWORD_API_URL } from "../../../constants/url";

import "./style.less";

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 8,
		},
	},
	wrapperCol: {
		xs: {
			span: 24,
		},
		sm: {
			span: 16,
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 16,
			offset: 8,
		},
	},
};

const PasswordForm = () => {
	const [form] = Form.useForm();
	// const { username, affiliation, permission } = useRecoilValue(userInfoState);
	// const setIsLoggedIn = useSetRecoilState(isLoginState);

	const changePassword = (values) => {
		// console.log('Received values of form: ', values);
		const { oldPassword, newPassword } = values;

		// axios
		// 	.post(
		// 		CHANGE_PASSWORD_API_URL,
		// 		JSON.stringify({
		// 			username,
		// 			oldPassword,
		// 			newPassword,
		// 		}),
		// 		{ headers: { "Content-Type": "application/json" } }
		// 	)
		// 	.then((res) => {
		// 		if (res.status === 200) {
		// 			message.success(res.data.message);
		// 			setIsLoggedIn(false);
		// 		}
		// 		// redirect
		// 	})
		// 	.catch((err) => {
		// 		if (err.response.status === 401) {
		// 			message.error(err.response.data.message);
		// 		} else {
		// 			message.error("Unknown error");
		// 		}
		// 	});
	};

	return (
		<Form
			{...formItemLayout}
			form={form}
			name="register"
			onFinish={changePassword}
			initialValues={{
				region: ["인천광역시", "중구", "수인사거리"],
			}}
			scrollToFirstError
			size="large"
		>
			<Form.Item name="username" label="계정" initialValue="username">
				<Input
					disabled
					prefix={<UserOutlined className="site-form-item-icon" />}
				/>
			</Form.Item>
			<Form.Item name="affiliation" label="소속" initialValue="affiliation">
				<Input
					disabled
					prefix={<BankOutlined className="site-form-item-icon" />}
				/>
			</Form.Item>
			<Form.Item name="permission" label="권한" initialValue="permission">
				<Cascader />
			</Form.Item>
			<Form.Item
				name="oldPassword"
				label="현재 비밀번호"
				rules={[
					{
						required: true,
						message: "현재 비밀번호를 입력하세요",
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="newPassword"
				label="새 비밀번호"
				rules={[
					{
						required: true,
						message: "새 비밀번호를 입력하세요",
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="confirm"
				label="비밀번호 확인"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "새 비밀번호를 다시 한번 입력하세요",
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (
								!value ||
								(getFieldValue("newPassword") === value &&
									getFieldValue("oldPassword") !== value)
							) {
								return Promise.resolve();
							}

							if (getFieldValue("newPassword") !== value) {
								return Promise.reject("비밀번호 확인이 올바르지 않습니다");
							}

							return Promise.reject(
								"현재 비밀번호와 다른 비밀번호를 입력해주세요"
							);
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item {...tailFormItemLayout}>
				<Button type="primary" htmlType="submit">
					확인
				</Button>
			</Form.Item>
		</Form>
	);
};

export default PasswordForm;
