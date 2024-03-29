import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Spin, message } from "antd";

import PasswordPage from "./pages/account/PasswordPage";
import SearchAccountPage from "./pages/account/SearchAccount";
import SignupPage from "./pages/account/SignupPage";
import LoginPage from "./pages/login/LoginPage";
import RealtimeStatisticPage from "./pages/realtimeStatistic/RealtimeStatisticPage";
import RealtimeStreamingPage from "./pages/realtimeStreaming/RealtimeStreamingPage";
import SearchOverSpeed from "./pages/search/OverspeedPage";
import SearchDownloadPage from "./pages/search/SearchPage";
import DayStatPage from "./pages/statisticAnalysis/DayStatPage";
import WeekStatPage from "./pages/statisticAnalysis/WeekStatPage";
import MonthStatPage from "./pages/statisticAnalysis/MonthStatPage";

const App = (props) => {
	const { baseURL } = props;
	const [loggedIn, setLoggedIn] = useState(false);
	const [isLoading, setLoading] = useState(true);
	const [isMaster, setMaster] = useState(false);
	const [realFirstFilter, setRealFirstFilter] = useState(false);

	useEffect(() => {
		loginStatus();
	}, [sessionStorage.getItem("username")]);

	const loginStatus = () => {
		axios
			.get(`${baseURL}/users/${sessionStorage.getItem("username")}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				let master = res.data.isMaster;
				if (master) {
					setMaster(true);
					setLoading(false);
				} else {
					setMaster(false);
					setLoading(false);
				}
				setLoggedIn(true);
			})
			.catch((err) => {
				if (err.response) {
					if (err.response.status === 401) {
						if (sessionStorage.getItem("username")) {
							message.warning("로그아웃 되었습니다");
						}
					}
				} else {
					message.error("Network Error");
				}
				setLoading(false);
			});
	};
	return (
		<>
			{isLoading ? (
				<div
					style={{
						marginTop: 20,
						marginBottom: 20,
						textAlign: "center",
						paddingTop: 30,
						paddingBottom: 30,
					}}
				>
					<Spin size="large" />
				</div>
			) : (
				<BrowserRouter>
					{loggedIn ? (
						<Switch>
							{/* <Route path="/login" render={() => <LoginPage />} /> */}
							<Route
								exact
								path="/realtime/streaming"
								render={() => (
									<RealtimeStreamingPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
										realFirstFilter={realFirstFilter}
									/>
								)}
							/>
							<Route
								path="/realtime/statistic"
								render={() => (
									<RealtimeStatisticPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
										realFirstFilter={realFirstFilter}
									/>
								)}
							/>
							<Route
								path="/statistic/day"
								render={() => (
									<DayStatPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
							<Route
								path="/statistic/week"
								render={() => (
									<WeekStatPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
							<Route
								path="/statistic/month"
								render={() => (
									<MonthStatPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
							<Route
								path="/search"
								render={() => (
									<SearchDownloadPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
							<Route
								path="/overspeed"
								render={() => (
									<SearchOverSpeed
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
							<Route
								path="/password"
								render={() => (
									<PasswordPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
							<Route
								path="/signup"
								render={() => (
									<SignupPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
							<Route
								path="/account"
								render={() => (
									<SearchAccountPage
										setLoggedIn={setLoggedIn}
										isMaster={isMaster}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
							<Redirect path="*" to="/realtime/streaming" />
						</Switch>
					) : (
						<Switch>
							<Route
								path="/*"
								render={() => (
									<LoginPage
										setLoggedIn={setLoggedIn}
										setRealFirstFilter={setRealFirstFilter}
									/>
								)}
							/>
						</Switch>
					)}
				</BrowserRouter>
			)}
		</>
	);
};
const mapStateToProps = (state) => {
	return {
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(App);
