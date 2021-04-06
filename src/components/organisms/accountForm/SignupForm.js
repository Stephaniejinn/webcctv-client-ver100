import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Modal, Alert, message } from "antd";
import { BankOutlined } from "@ant-design/icons";
import useClippy from "use-clippy";
import { connect } from "react-redux";
import axios from "axios";

import Cascader from "../../atoms/cascader/Cascader";
import AccountDescriptionForm from "../../atoms/accountDescription/AccountDescriptionFrom";

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

const SignupForm = (props) => {
	const { baseURL } = props;
	const [form] = Form.useForm();
	const [modalVisible, setModalVisible] = useState(false);
	const [clipboard, setClipboard] = useClippy();
	const [signupInfo, setSignupInfo] = useState({
		username: "",
		password: "",
		affiliate: "",
		permission: "",
	});

	const handleModalClose = () => {
		setModalVisible(false);
	};
	const handleCopy = () => {
		setClipboard(
			`아이디: ${signupInfo.username} 비밀번호: ${signupInfo.password}`
		);
		message.success("클립보드에 복사되었습니다");
	};
	const signUp = (values) => {
		// const { affiliation, permission } = values;
		const { affiliate } = values;
		const permission = "[]";
		axios
			.post(
				`${baseURL}/users`,
				JSON.stringify({
					affiliate,
					permission,
				}),
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				console.log(res.data);
				setModalVisible(true);
				setSignupInfo({
					username: res.data.username,
					password: res.data.password,
					affiliate,
					permission,
				});
			})
			.catch((err) => {
				// if (err.response.status === 401) {
				// 	message.error("관리자 비밀번호가 잘못되었습니다");
				// }
				console.log(err.response);
			});
	};

	return (
		<Form
			labelCol={formItemLayout.labelCol}
			wrapperCol={formItemLayout.wrapperCol}
			form={form}
			name="register"
			onFinish={signUp}
			scrollToFirstError
			size="large"
		>
			<Form.Item
				name="affiliate"
				label="소속"
				rules={[
					{
						required: true,
						message: "발급 대상의 소속을 입력하세요.",
					},
				]}
			>
				<Input prefix={<BankOutlined className="site-form-item-icon" />} />
			</Form.Item>

			<Form.Item
				name="permission"
				label="권한"
				rules={[
					{
						type: "array",
						// required: true,
						required: false,
						message: "발급 대상의 권한을 선택하세요.",
					},
				]}
			>
				<Cascader isDisabled={true} placeholdertxt="권한을 선택하세요" />
			</Form.Item>
			{/* <Form.Item
				name="signupPassword"
				label="관리자 비밀번호"
				rules={[
					{
						required: true,
						message: "관리자 비밀번호를 입력하세요.",
					},
				]}
			>
				<Input.Password />
			</Form.Item> */}
			{/* <Form.Item
				name="confirm"
				valuePropName="checked"
				rules={[
					{
						validator: (_, value) =>
							value
								? Promise.resolve()
								: Promise.reject("담당자임을 확인해주세요."),
					},
				]}
				wrapperCol={tailFormItemLayout.wrapperCol}
				style={{ marginBottom: 6 }}
			>
				<Checkbox>글로벌브릿지 담당자임을 확인합니다.</Checkbox>
			</Form.Item> */}
			<Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
				<Button type="primary" htmlType="submit" size="large">
					발급
				</Button>
				<Modal
					title={<Alert message="발급성공" type="success" showIcon />}
					visible={modalVisible}
					closable={false}
					footer={
						<>
							<Button key="copy" type="default" onClick={handleCopy}>
								복사
							</Button>
							<Button key="confirm" type="primary" onClick={handleModalClose}>
								확인
							</Button>
						</>
					}
					onCancel={handleModalClose}
				>
					<AccountDescriptionForm
						username={signupInfo.username}
						password={signupInfo.password}
						affiliation={signupInfo.affiliate}
						permission={signupInfo.permission}
					/>
				</Modal>
			</Form.Item>
		</Form>
	);
};
const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(SignupForm);
