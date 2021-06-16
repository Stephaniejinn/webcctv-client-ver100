import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, message, Tooltip } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import MyCascader from "../cascader/Cascader";

import "./style.less";

const CascaderWButton = (props) => {
	const {
		cameraCode,
		setLocationInfo,
		setLocationCodeInfo,
		setCamNameAdd,
		setLoadingNameAdd,
		setLoggedIn,
		size,
		setFirstFilter,
		page,
		tooltipText,
		cascaderText,
	} = props;
	const [selectedLocation, setSelectedLocation] = useState([]);
	const [selectedLocationCode, setSelectedLocationCode] = useState([]);
	const [locationChange, setLocationChange] = useState(false);
	const history = useHistory();
	const { pathname } = window.location;

	const handleSearch = () => {
		if (locationChange) {
			if (
				page === "REALSTATISTIC" &&
				selectedLocationCode["cameraCode"] === cameraCode
			) {
				message.warning("조회된 데이터입니다"); //location doesn't change
			}
			setLocationInfo(selectedLocation);
			setLocationCodeInfo(selectedLocationCode);
			if (pathname !== "/realtime/statistic") {
				history.push("/realtime/statistic");
			}
			if (setFirstFilter) {
				setFirstFilter(true);
			}

			console.log("test", selectedLocationCode);
		} else {
			message.warning("위치설정 해주세요"); //location is empty
		}
	};

	return (
		<div className="cascader-with-button">
			<MyCascader
				size={size}
				setSelectedLocation={setSelectedLocation}
				setSelectedLocationCode={setSelectedLocationCode}
				setLocationChange={setLocationChange}
				setCamNameAdd={setCamNameAdd}
				setLoadingNameAdd={setLoadingNameAdd}
				setLoggedIn={setLoggedIn}
				cascaderText={cascaderText}
			/>
			<Tooltip placement="topLeft" title={tooltipText}>
				<Button size={size} type="primary" onClick={handleSearch}>
					검색
				</Button>
			</Tooltip>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		cameraCode: state.locationCode.cameraCode,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setLocationInfo: (selectedOption) => {
			dispatch(actions.setLocation(selectedOption));
		},
		setLocationCodeInfo: (selectedOptionCode) => {
			dispatch(actions.setLocationCode(selectedOptionCode));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CascaderWButton);
