// export const userInfo = () => ({
// 	type: "USER_INFO",
// 	payload: "",
// });

export const setUserInfo = (payload) => ({
	type: "USER_INFO_SET",
	payload,
});

export const getLocation = () => ({
	type: "LOCATION_INFO",
	playload: "",
});

export const setLocation = (payload) => ({
	type: "LOCATION_SET",
	payload,
});

export const getLocationCode = () => ({
	type: "LOCATION_CODE_INFO",
	playload: "",
});

export const setLocationCode = (payload) => ({
	type: "LOCATION_CODE_SET",
	payload,
});

export const getURL = () => ({
	type: "BASE_URL",
	playload: "",
});
