import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import configStore from "./redux/store";
import { persistor } from "./redux/store";

import App from "./App";

import "./index.less";

ReactDOM.render(
	<Provider store={configStore}>
		<PersistGate loading={null} persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>,
	document.getElementById("root")
);

reportWebVitals();
