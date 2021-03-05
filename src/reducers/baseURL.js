const initialState = {
	baseURL: "http://119.197.240.186:3003/api",
};
export default function URL(state = initialState, action) {
	switch (action.type) {
		case "BASE_URL":
			return action.payload;
		default:
			return state;
	}
}
