import { combineReducers } from "redux";
import location from "./location";
import userInfo from "./userInfo";

export default combineReducers({
	location,
	userInfo,
});
