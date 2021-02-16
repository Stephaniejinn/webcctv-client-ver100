export const userInfo = () => ({
	type: "USER_INFO",
	payload: "",
});

export const getLocation = () => ({
	type: "LOCATION_INFO",
	playload: "",
});

export const setLocation = (payload) => ({
	type: "LOCATION_SET",
	payload,
});
