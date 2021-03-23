const initialState = {
	baseURL: "http://119.197.240.186:3004/api",
	trafficURL: "/statistics/road-traffic",
};
export default function URL(state = initialState, action) {
	switch (action.type) {
		case "BASE_URL":
			return action.payload;
		default:
			return state;
	}
}
