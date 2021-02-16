import React, { useState } from "react";
import axios from "axios";
import { Cascader } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../actions";
// import { convertLegacyProps } from "antd/lib/button/button";

// var selectedOption = { city: "", district: "", road: "", spot: "", camera: "" };
const MyCascader = (props) => {
	const { size, setLocationInfo } = props;
	console.log(props);
	const [visible, setVisible] = useState(true);
	const [parsedOptions, setParsedOptions] = useState([]);
	// const [defaultOption, setDefaultOption] = useState(() => {});

	const baseURL = "http://119.197.240.186:3002/api/v1";
	const currentURL = "/locations";
	var selectedOption = {
		city: "",
		district: "",
		road: "",
		spot: "",
		camera: "",
	};
	if (props.city === "") {
		var defaultOption = [];
	} else {
		defaultOption = [
			props.city,
			props.district,
			props.road,
			props.spot,
			props.camera,
		];
	}

	var locationOptionsParse = [];

	const getOptions = () => {
		setVisible(!visible);
		if (visible) {
			axios
				.get(`${baseURL}${currentURL}/cities`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				})
				.then((res) => {
					res.data.forEach((cityInfo) => {
						const { cityCode, cityName } = cityInfo;
						const cityTemp = {};
						cityTemp["value"] = cityCode;
						cityTemp["label"] = cityName;
						cityTemp["children"] = [];
						locationOptionsParse.push(cityTemp);
						getDisricts(cityCode);
						// console.log("options test: ", locationOptionsParse);
						setParsedOptions(locationOptionsParse);
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};
	const getDisricts = (cityCode) => {
		axios
			.get(`${baseURL}${currentURL}/${cityCode}/districts`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				res.data.forEach((districtInfo) => {
					const districtTemp = {};

					const { districtCode, districtName } = districtInfo;
					districtTemp["value"] = districtCode;
					districtTemp["label"] = districtName;
					districtTemp["children"] = [];
					const lastCityIdx = locationOptionsParse.length - 1;
					locationOptionsParse[lastCityIdx]["children"].push(districtTemp);
					const lastDistrictIdx =
						locationOptionsParse[lastCityIdx]["children"].length - 1;
					const currentRoads = [];
					getRoads(
						cityCode,
						districtCode,
						lastCityIdx,
						lastDistrictIdx,
						districtTemp,
						currentRoads
					);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getRoads = (cityCode, districtCode, lastCityIdx, lastDistrictIdx) => {
		axios
			.get(`${baseURL}${currentURL}/${cityCode}/${districtCode}/roads`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
					Cache: "No-cache",
				},
			})
			.then((res) => {
				res.data.forEach((roadInfo) => {
					const { roadCode, roadName } = roadInfo;
					const roadTemp = {};
					roadTemp["value"] = roadCode;
					roadTemp["label"] = roadName;
					roadTemp["children"] = [];
					locationOptionsParse[lastCityIdx]["children"][lastDistrictIdx][
						"children"
					].push(roadTemp);
					const lastRoadIdx =
						locationOptionsParse[lastCityIdx]["children"][lastDistrictIdx][
							"children"
						].length - 1;
					const currentSpots = [];

					getSpots(
						cityCode,
						districtCode,
						roadCode,
						lastCityIdx,
						lastDistrictIdx,
						lastRoadIdx,
						currentSpots
					);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getSpots = (
		cityCode,
		districtCode,
		roadCode,
		lastCityIdx,
		lastDistrictIdx,
		lastRoadIdx
	) => {
		axios
			.get(
				`${baseURL}${currentURL}/${cityCode}/${districtCode}/${roadCode}/spots`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				res.data.forEach((spotInfo) => {
					const { spotCode, spotName } = spotInfo;
					const spotTemp = {};
					spotTemp["value"] = spotCode;
					spotTemp["label"] = spotName;
					spotTemp["children"] = [];

					locationOptionsParse[lastCityIdx]["children"][lastDistrictIdx][
						"children"
					][lastRoadIdx]["children"].push(spotTemp);
					const lastSpotIdx =
						locationOptionsParse[lastCityIdx]["children"][lastDistrictIdx][
							"children"
						][lastRoadIdx]["children"].length - 1;
					const currentCameras = [];
					getCameras(
						cityCode,
						districtCode,
						roadCode,
						spotCode,
						currentCameras
					);
					locationOptionsParse[lastCityIdx]["children"][lastDistrictIdx][
						"children"
					][lastRoadIdx]["children"][lastSpotIdx]["children"] = currentCameras;
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getCameras = (
		cityCode,
		districtCode,
		roadCode,
		spotCode,
		currentCameras
	) => {
		axios
			.get(
				`${baseURL}${currentURL}/${cityCode}/${districtCode}/${roadCode}/${spotCode}/cameras`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				res.data.forEach((cameraInfo) => {
					const { camCode, camName, upboundFlag } = cameraInfo;
					const cameraTemp = {};
					cameraTemp["value"] = camCode;
					upboundFlag
						? (cameraTemp["label"] = camName + "[상행]")
						: (cameraTemp["label"] = camName + "[하행]");

					currentCameras.push(cameraTemp);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onChange = (value, selectedOptions) => {
		const vals = selectedOptions.map((item) => item.label);
		const keys = ["city", "district", "road", "spot", "cameras"];
		selectedOption = vals.reduce((obj, item, idx) => {
			obj[keys[idx]] = item;
			return obj;
		}, {});
		console.log(selectedOptions);
		setLocationInfo(selectedOption);
	};

	const filter = (inputValue, path) => {
		return path.some(
			(option) =>
				option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
		);
	};

	return (
		<>
			<Cascader
				size={size}
				expandTrigger="hover"
				onChange={onChange}
				placeholder="위치 선택"
				showSearch={{ filter }}
				onPopupVisibleChange={getOptions}
				options={parsedOptions}
				defaultValue={defaultOption}
			/>
		</>
	);
};

const mapStateToProps = (state) => {
	// defaultOption = Object.values(state.location);
	return {
		city: state.location.city,
		district: state.location.district,
		road: state.location.road,
		spot: state.location.spot,
		camera: state.location.camera,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getLocationInfo: () => {
			dispatch(actions.getLocation());
		},
		setLocationInfo: (selectedOption) => {
			dispatch(actions.setLocation(selectedOption));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCascader);
