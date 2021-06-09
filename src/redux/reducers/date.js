const initialState = {
	startDate: "",
	endDate: "",
};
export default function date(state = initialState, action) {
	switch (action.type) {
		case "DATE":
			const { startDate, endDate } = action.payload;
			return { startDate, endDate };
		default:
			return state;
	}
}
