export const setLocation = (payload) => ({
	type: "LOCATION_SET",
	payload,
});

export const setLocationCode = (payload) => ({
	type: "LOCATION_CODE_SET",
	payload,
});
export const setDateInfo = (payload) => ({
	type: "DATE",
	payload,
});

// export const getLocation = () => ({
// 	type: "LOCATION_INFO",
// 	payload: "",
// });

// export const getLocationCode = () => ({
// 	type: "LOCATION_CODE_INFO",
// 	payload: "",
// });

// export const getURL = () => ({
// 	type: "BASE_URL",
// 	payload: "",
// });
