import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../actions";

const MyCascader = (props) => {
	const {
		size,
		setSelectedLocation,
		setSelectedLocationCode,
		displayLocation = true,
		setLocationChange,
	} = props;

	// const [visible, setVisible] = useState(true);
	const [parsedOptions, setParsedOptions] = useState([]);

	const baseURL = "http://119.197.240.186:3003/api";
	const currentURL = "/locations";
	var locationOptionsParse = [];

	if (props.city === "" || displayLocation === false) {
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
	useEffect(() => {
		getOptions();
	}, []);

	const getOptions = () => {
		// setVisible(!visible);
		// if (visible) {
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
		// }
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
				// `${baseURL}${currentURL}/${cityCode}/${districtCode}/${roadCode}/${spotCode}/cameras`,

				`${baseURL}${currentURL}/${cityCode}/${districtCode}/${roadCode}/002/cameras`,
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
		const optionVals = selectedOptions.map((item) => item.label);
		const optionKeys = ["city", "district", "road", "spot", "camera"];
		const selectedLocation = optionVals.reduce((obj, item, idx) => {
			obj[optionKeys[idx]] = item;
			return obj;
		}, {});

		const codeKeys = [
			"cityCode",
			"districtCode",
			"roadCode",
			"spotCode",
			"cameraCode",
		];
		const selectedLocationCode = value.reduce((obj, item, idx) => {
			obj[codeKeys[idx]] = item;
			return obj;
		}, {});
		setSelectedLocation(selectedLocation);
		setSelectedLocationCode(selectedLocationCode);
		if (setLocationChange) {
			setLocationChange(true);
		}
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
				// onPopupVisibleChange={getOptions}
				options={parsedOptions}
				defaultValue={defaultOption}
			/>
		</>
	);
};

const mapStateToProps = (state) => {
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
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(MyCascader);
