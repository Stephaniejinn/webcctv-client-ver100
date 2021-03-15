const initialState = {
	cityCode: "ICN",
	districtCode: "28110",
	roadCode: "2008001",
	spotCode: "001",
	cameraCode: "0001",
	camAddress: "http://globalbridge3.iptime.org:4000/videos/output.m3u8",
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
				camAddress,
			} = action.payload;

			return {
				cityCode,
				districtCode,
				roadCode,
				spotCode,
				cameraCode,
				camAddress,
			};
		default:
			return state;
	}
}
