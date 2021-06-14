import React from "react";
import { Form, Input, Button, message } from "antd";
import { BankOutlined } from "@ant-design/icons";
import NodeRSA from "node-rsa";
import { connect } from "react-redux";
import axios from "axios";

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

	/* ==== < RSA Encryption > ==== */
	const encrypt = (plainText, keyData) => {
		const publicKey = new NodeRSA();
		publicKey.importKey(keyData);
		const password = publicKey.encrypt(plainText, "base64");
		return password;
	};

	const rsaEncrypt = (values) => {
		let { signupUsername, password, affiliate } = values;
		axios
			.get(`${baseURL}/auth/pubkey`)
			.then((Response) => {
				password = encrypt(password, Response.data.publicKey);
				console.log("password", password);
				const newValues = { signupUsername, password, affiliate };
				signUp(newValues);
			})
			.catch((Error) => {
				console.log(Error);
			});
	};
	/* ============================ */

	const signUp = (values) => {
		const { signupUsername, password, affiliate } = values;
		const permission = "[]";
		axios
			.post(
				`${baseURL}/users`,
				JSON.stringify({
					username: signupUsername,
					password,
					affiliate,
					permission,
				}),
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				if (res.data.success) {
					message.success("계정발급 성공하였습나다");
				}
			})
			.catch((err) => {
				if (err.response.status === 409) {
					message.error("이미 존재하는 아이디입니다");
				}
			});
	};

	return (
		<Form
			labelCol={formItemLayout.labelCol}
			wrapperCol={formItemLayout.wrapperCol}
			form={form}
			name="register"
			onFinish={rsaEncrypt}
			scrollToFirstError
			size="large"
			autoComplete="off"
		>
			<Form.Item
				name="signupUsername"
				label="아이디"
				rules={[
					{
						required: true,
						message: "발급 대상의 계정이름을 입력하세요.",
					},
					{
						min: 6,
						message: "최소 6자리 이상",
					},
					{
						max: 16,
						message: "최대 16자리",
					},
					{
						validator: (rule, value) => {
							const oSpecial = "-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\"";
							let total = 0;
							const oSpeArr = value.split("");
							const oSpeItem = oSpeArr.find(
								(item) => oSpecial.indexOf(item) !== -1
							);
							if (oSpeItem !== undefined) {
								total += 1;
							}
							if (total > 0) {
								return Promise.reject("영문과 숫자만 가능");
							}
							return Promise.resolve();
						},
					},
				]}
			>
				<Input prefix={<BankOutlined className="site-form-item-icon" />} />
			</Form.Item>
			<Form.Item
				name="password"
				label="비밀번호"
				autoComplete="off"
				rules={[
					{
						type: "string",
						required: true,
						message: "발급 대상의 초기 비밀번호를 입력하세요",
					},
					{
						min: 8,
						message: "최소 8자리 이상",
					},
					{
						validator: (rule, value) => {
							const oNumber = "0123456789";
							const oLetter = "abcdefghijklmnopqrstuvwxyz";
							const oLetterCap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
							const oSpecial = "-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\"";
							const oTher = oNumber + oLetter + oLetterCap + oSpecial;
							let total = 0;
							const oSpeArr = value.split("");

							const oNumberItem = oSpeArr.find(
								(item) => oNumber.indexOf(item) !== -1
							);
							const oLetterItem = oSpeArr.find(
								(item) => oLetter.indexOf(item) !== -1
							);
							const oLetterCapItem = oSpeArr.find(
								(item) => oLetterCap.indexOf(item) !== -1
							);
							const oSpeItem = oSpeArr.find(
								(item) => oSpecial.indexOf(item) !== -1
							);
							const oTherItem = oSpeArr.find(
								(item) => oTher.indexOf(item) === -1
							);
							if (oTherItem !== undefined) {
								return Promise.reject(
									"영문 대문자, 소문자, 숫자, 특수문자(-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\") 최소 한개 이상"
								);
							}
							if (oNumberItem !== undefined) {
								total += 1;
							} else {
								return Promise.reject("숫자 최소 한개 이상");
							}
							if (oLetterItem !== undefined) {
								total += 1;
							} else {
								return Promise.reject("영문 소문자 최소 한개 이상");
							}
							if (oSpeItem !== undefined) {
								total += 1;
							} else {
								return Promise.reject(
									"특수문자(-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\") 최소 한개 이상"
								);
							}
							if (oLetterCapItem !== undefined) {
								total += 1;
							} else {
								return Promise.reject("영문 대문자 최소 한개 이상");
							}
							if (total === 4) {
								return Promise.resolve();
							}
							return Promise.reject(
								"영문 대문자, 소문자, 숫자, 특수문자(-#@!$%^&* ()_+|~=`{}[]:;'<>?,./\") 최소 한개 이상"
							);
						},
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="confirm"
				label="비밀번호 재확인"
				dependencies={["password"]}
				hasFeedback
				rules={[
					{
						required: true,
						message: "발급 대상의 초기 비밀번호를 다시 한번 입력하세요",
					},
					({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject("비밀번호 확인이 올바르지 않습니다");
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>
			<Form.Item
				name="affiliate"
				label="소속"
				rules={[
					{
						required: true,
						message: "발급 대상의 소속을 입력하세요.",
					},
					{
						min: 1,
						message: "최소 1자리 이상",
					},
					{
						max: 16,
						message: "최대 16자리",
					},
				]}
			>
				<Input prefix={<BankOutlined className="site-form-item-icon" />} />
			</Form.Item>
			<Form.Item wrapperCol={tailFormItemLayout.wrapperCol}>
				<Button type="primary" htmlType="submit" size="large">
					발급
				</Button>
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
