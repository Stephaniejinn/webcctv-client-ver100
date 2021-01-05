import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import DayStatPage from "./components/pages/statisticAnalysis/DayStatPage";
import "./App.less";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" render={() => <DayStatPage />} />
				<Route path="/statistic/day" render={() => <DayStatPage />} />
			</Switch>
		</BrowserRouter>
	);
};
export default App;
