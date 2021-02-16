const initialState = {
	username: "master",
	affiliation: "글로벌브릿지",
	// avatarAbbr: "d",
	permission: [],
};
export default function userInfo(state = initialState, action) {
	switch (action.type) {
		case "USER_INFO":
			return action.payload;
		default:
			return state;
	}
}
