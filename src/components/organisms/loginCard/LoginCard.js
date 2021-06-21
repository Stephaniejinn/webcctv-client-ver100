import React from "react";
import { Form, Input, Button, message, Card, Modal } from "antd";
import {
	UserOutlined,
	LockOutlined,
	ExclamationCircleOutlined,
} from "@ant-design/icons";
import NodeRSA from "node-rsa";
import axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginCard = (props) => {
	const { baseURL, setLoggedIn } = props;
	const { confirm } = Modal;
	const history = useHistory();

	/* ==== < RSA Encryption > ==== */
	const encrypt = (plainText, keyData) => {
		const publicKey = new NodeRSA();
		publicKey.importKey(keyData);
		const password = publicKey.encrypt(plainText, "base64");
		return password;
	};

	const rsaEncrypt = (values) => {
		let { username, password } = values;
		axios
			.get(`${baseURL}/auth/pubkey`)
			.then((Response) => {
				password = encrypt(password, Response.data.publicKey);
				const newValues = { username, password };
				login(newValues);
			})
			.catch((Error) => {});
	};
	/* ============================ */
	const passwordConfirm = () => {
		confirm({
			title: "초기 비밀번호 변경하세요",
			icon: <ExclamationCircleOutlined />,
			okText: "지금 변경하기",
			cancelText: "나중에",
			onOk() {
				setLoggedIn(true);
				history.push("/password");
			},
			onCancel() {
				setLoggedIn(true);
				history.push("/realtime/streaming");
			},
		});
	};
	const login = (values) => {
		const { username, password } = values;
		axios
			.post(
				`${baseURL}/auth/tokens`,
				JSON.stringify({
					username,
					password,
				}),
				{
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => {
				const { jwt } = res.data;
				window.sessionStorage.setItem("token", jwt);
				window.sessionStorage.setItem("username", username);
				getUserInfo();
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 500) {
						message.error(
							"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
						);
					} else if (err.response.status === 400) {
						message.warning("아이디 혹은 비밀번호가 일치하지 않습니다");
					} else if (err.response.status === 401) {
						message.warning(
							`아이디 혹은 비밀번호가 일치하지 않습니다. 비밀번호를 5번 잘못 입력되면 계정이 자동으로 잠기게 됩니다. (${err.response.data.payload.loginRetries}/5)`
						);
					} else if (err.response.status === 403) {
						message.error("계정이 잠겼습니다. 관리자에 연락하세요.");
						setLoggedIn(false);
					}
				} else {
					message.error("Network Error");
				}
			});
	};
	const getUserInfo = () => {
		axios
			.get(`${baseURL}/users/${sessionStorage.getItem("username")}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				window.sessionStorage.setItem("affiliate", res.data.affiliate);
				if (!res.data.initPWChangedFlag) {
					passwordConfirm();
				} else {
					setLoggedIn(true);
				}
			})
			.catch((err) => {});
	};
	return (
		<Card>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{
					remember: true,
				}}
				onFinish={rsaEncrypt}
				size="large"
			>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: "아이디를 입력하세요",
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="아이디"
					/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: "비밀번호를 입력하세요",
						},
					]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="비밀번호"
						autoComplete="true"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						로그인
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};

const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(LoginCard);
