const initialState = {
	cityCode: "",
	districtCode: "",
	roadCode: "",
	spotCode: "",
	cameraCode: "",
};
export default function location(state = initialState, action) {
	switch (action.type) {
		case "LOCATION_CODE_INFO":
			return action.payload;

		case "LOCATION_CODE_SET":
			const {
				cityCode,
				districtCode,
				roadCode,
				spotCode,
				cameraCode,
			} = action.payload;

			return {
				cityCode,
				districtCode,
				roadCode,
				spotCode,
				cameraCode,
			};
		default:
			return state;
	}
}
