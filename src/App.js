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
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkdCMTAwMSIsImlhdCI6MTYxNTc3NjEzMywiZXhwIjoxNjE2MzgwOTMzLCJpc3MiOiJnbG9iYWxicmlkZ2UuY29tIiwianRpIjoiYWU5YTk4MDktOGU0MC00YTkwLTg5MTgtNjY4NzA1MmY5NTE3In0.wLockphNu6Nkinm6kZbG44pYHbsRR-K5y7U7r6firrM"
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
