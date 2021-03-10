import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducers from "./reducers";
import * as actions from "./actions";
import App from "./App";

import "./index.less";

const store = createStore(reducers);
console.log(store.getState());
// store.subscribe(() => console.log(store.getState()));
// store.dispatch(actions.setLocation({ city: "city", district: "district" }));

ReactDOM.render(
	// <Provider store={createStore(reducers)}>
	<Provider store={store}>
		<App />
	</Provider>,
	// <React.StrictMode>
	// 	<App />
	// </React.StrictMode>,

	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
