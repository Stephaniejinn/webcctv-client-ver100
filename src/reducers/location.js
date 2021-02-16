const initialState = {
	city: "",
	district: "",
	road: "",
	spot: "",
	camera: "",
	// city: "인천광역시",
	// district: "중구",
	// road: "서해대로",
	// spot: "수인사거리",
	// camera: "수인사거리-1[하행]",
};
export default function location(state = initialState, action) {
	switch (action.type) {
		case "LOCATION_INFO":
			return action.payload;
		// ...state,
		// action.payload,

		case "LOCATION_SET":
			const { city, district, road, spot, camera } = action.payload;

			return {
				city,
				district,
				road,
				spot,
				camera,
			};
		default:
			return state;
	}
}
