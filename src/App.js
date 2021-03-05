import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

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

const App = () => {
	window.localStorage.setItem(
		"token",
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdCMTAwMSIsImlhdCI6MTYxNDgyMDQ5NSwiZXhwIjoxNjE1NDI1Mjk1LCJpc3MiOiJnbG9iYWxicmlkZ2UuY29tIiwianRpIjoiYzkzMGUwNDYtNTVjZS00YmUzLWI5MzQtZWVmMTJmZmNmZjc3In0.S7Udrqj40MlmrEYsvMZYx3XLxsP4d1otd0a7I_qCw9Y"
	);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" render={() => <LoginPage />} />
				<Route
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
			</Switch>
		</BrowserRouter>
	);
};
export default App;
