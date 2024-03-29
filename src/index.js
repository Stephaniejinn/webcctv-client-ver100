import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { PersistGate } from "redux-persist/lib/integration/react";

import configStore from "./redux/store";
import { persistor } from "./redux/store";
import App from "./components/index.js";
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
