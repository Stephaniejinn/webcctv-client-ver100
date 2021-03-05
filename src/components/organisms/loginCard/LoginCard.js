import React from "react";
import axios from "axios";
import { Form, Input, Button, message, Card, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

// import { isLoginState } from "../../../states/app";
// import { userInfoState } from "../../../states/ui";
// import { LOGIN_API_URL } from "../../../constants";

const { Title } = Typography;

const LoginCard = () => {
	// const setIsLoggedIn = useSetRecoilState(isLoginState);
	// const setUserInfo = useSetRecoilState(userInfoState);
	// const apiURL = LOGIN_API_URL;

	const login = (values) => {
		// axios
		// 	.get("http://119.197.240.186:3002/api/locations/cities", {
		// 		headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
		// 	})
		// 	.then((res) => {
		// 		res.data.map((cityInfo) => {
		// 			const { cityCode, cityName } = cityInfo;
		// 			console.log(cityCode, cityName);
		// 		});
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
		// const { username, password } = values;
		// axios
		// 	.post(
		// 		apiURL,
		// 		JSON.stringify({
		// 			username,
		// 			password,
		// 		}),
		// 		{ headers: { "Content-Type": "application/json" } }
		// 	)
		// 	.then((res) => {
		// 		const {
		// 			success,
		// 			username,
		// 			avatarAbbr,
		// 			affiliation,
		// 			permission,
		// 		} = res.data;
		// 		if (success) {
		// 			setUserInfo({
		// 				username,
		// 				avatarAbbr,
		// 				affiliation,
		// 				permission,
		// 			});
		// 			window.localStorage.setItem("username", username);
		// 			window.localStorage.setItem("avatarAbbr", avatarAbbr);
		// 			window.localStorage.setItem("affiliation", affiliation);
		// 			// window.localStorage.setItem('permission', JSON.stringify(permission));
		// 			setIsLoggedIn(success);
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		setIsLoggedIn(false);
		// 		message.error("로그인 실패");
		// 	});
	};

	return (
		<Card>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{
					remember: true,
				}}
				onFinish={login}
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

export default LoginCard;
