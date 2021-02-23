import { combineReducers } from "redux";
import location from "./location";
import userInfo from "./userInfo";
import locationCode from "./locationCode";

export default combineReducers({
	location,
	locationCode,
	userInfo,
});
