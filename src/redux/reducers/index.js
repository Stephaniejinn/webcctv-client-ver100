import { combineReducers } from "redux";
import location from "./location";
import locationCode from "./locationCode";
import baseURL from "./baseURL";
import date from "./date";
export default combineReducers({
	location,
	locationCode,
	baseURL,
	date,
});
