import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Cascader, message } from "antd";

const MyCascader = (props) => {
	const {
		size,
		setSelectedLocation,
		setSelectedLocationCode,
		setLocationChange,
		baseURL,
		isDisabled,
		setCamNameAdd,
		setLoadingNameAdd,
		setLoggedIn,
		cascaderText,
	} = props;

	const [parsedOptions, setParsedOptions] = useState([]);
	const [camAddress, setCamAddress] = useState({});
	const [camLanes, setCamLanes] = useState({});

	const currentURL = "/locations";
	var locationOptionsParse = [];
	var cameraAddress = {};
	var cameraLanes = {};
	var cameraNameAddress = {};

	useEffect(() => {
		getOptions();
	}, []);

	const getOptions = () => {
		axios
			.get(`${baseURL}${currentURL}/cities`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
					setParsedOptions(locationOptionsParse);
				});
				setCamAddress(cameraAddress);
				setCamLanes(cameraLanes);
				if (setCamNameAdd) {
					setCamNameAdd(cameraNameAddress);
					setLoadingNameAdd(false);
				}
			})
			.catch((err) => {
				if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				} else if (err.response.status === 401) {
					message.warning(
						"로그인 정보가 유효하지 않습니다. 다시 로그인해주세요"
					);
					setLoggedIn(false);
				}
			});
	};
	const getDisricts = (cityCode) => {
		axios
			.get(`${baseURL}${currentURL}/${cityCode}/districts`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
				if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
			});
	};
	const getRoads = (cityCode, districtCode, lastCityIdx, lastDistrictIdx) => {
		axios
			.get(`${baseURL}${currentURL}/${cityCode}/${districtCode}/roads`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
				if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
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
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
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
				if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
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
						Authorization: `Bearer ${sessionStorage.getItem("token")}`,
						Cache: "No-cache",
					},
				}
			)
			.then((res) => {
				res.data.forEach((cameraInfo) => {
					const { camCode, camName, upboundFlag, httpStreamAddr, lanesTotal } =
						cameraInfo;
					const cameraTemp = {};
					cameraTemp["value"] = camCode;
					upboundFlag
						? (cameraTemp["label"] = camName + " [상행]")
						: (cameraTemp["label"] = camName + " [하행]");

					currentCameras.push(cameraTemp);
					cameraAddress[camCode] = httpStreamAddr;
					cameraLanes[camCode] = lanesTotal;
					if (setCamNameAdd) {
						cameraNameAddress[camCode] = [cameraTemp["label"], httpStreamAddr];
					}
				});
			})
			.catch((err) => {
				if (err.response.status === 500) {
					message.error(
						"네트워크 문제 혹은 일시적인 오류로 데이터를 불러올 수 없습니다"
					);
				} else if (err.response.status === 401) {
					setLoggedIn(false);
				}
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
		selectedLocationCode["camAddress"] = camAddress[value[4]];
		selectedLocationCode["camLanes"] = camLanes[value[4]];
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
				placeholder={cascaderText}
				showSearch={{ filter }}
				options={parsedOptions}
				disabled={isDisabled && isDisabled}
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
		baseURL: state.baseURL.baseURL,
	};
};

export default connect(mapStateToProps)(MyCascader);
