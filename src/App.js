import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./redux/actions";

import RealtimeStreamingPage from "./components/pages/realtimeStreaming/RealtimeStreamingPage";
import RealtimeStatisticPage from "./components/pages/realtimeStatistic/RealtimeStatisticPage";
import DayStatPage from "./components/pages/statisticAnalysis/DayStatPage";
import WeekStatPage from "./components/pages/statisticAnalysis/WeekStatPage";
import MonthStatPage from "./components/pages/statisticAnalysis/MonthStatPage";
import SearchDownloadPage from "./components/pages/searchDownload/SearchDownloadPage";
import DataComparisonPage from "./components/pages/dataComparison/DataComparisonPage";
import PasswordPage from "./components/pages/account/PasswordPage";
import SignupPage from "./components/pages/account/SignupPage";
import LoginPage from "./components/pages/login/LoginPage";

const App = (props) => {
	const { isloggedIn } = props;
	return (
		<BrowserRouter>
			{isloggedIn ? (
				<Switch>
					{console.log(isloggedIn)}
					{/* <Route path="/login" render={() => <LoginPage />} /> */}
					<Route
						exact
						path="/realtime/streaming"
						render={() => <RealtimeStreamingPage />}
					/>
					<Route
						path="/realtime/statistic"
						render={() => <RealtimeStatisticPage />}
					/>
					<Route path="/statistic/day" render={() => <DayStatPage />} />
					<Route path="/statistic/week" render={() => <WeekStatPage />} />
					<Route path="/statistic/month" render={() => <MonthStatPage />} />
					<Route path="/search" render={() => <SearchDownloadPage />} />
					<Route path="/comparison" render={() => <DataComparisonPage />} />
					<Route path="/password" render={() => <PasswordPage />} />
					<Route path="/signup" render={() => <SignupPage />} />
					<Redirect path="*" to="/realtime/streaming" />
				</Switch>
			) : (
				<Switch>
					<Route path="*" render={() => <LoginPage />} />
				</Switch>
			)}
		</BrowserRouter>
	);
};
const mapStateToProps = (state) => {
	return {
		isloggedIn: state.userInfo.isloggedIn,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		// getUserInfo: () => {
		// 	dispatch(actions.userInfo());
		// },
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
