import React, { useState } from "react";
import { Typography, Switch, Space, Button, Select } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import Cascader from "../../atoms/cascader/Cascader";
import DatePicker from "../../atoms/datePicker/DatePicker";
import MultiRadio from "../../molecules/multiRadio/MultiRadio";

import "./style.less";

const SeachData = (props) => {
	const {
		period,
		classification,
		setClassification,
		setSearchUnit,
		setStartDate,
		setEndTime,
		setFirstFilter,
		setLocationInfo,
		setLocationCodeInfo,
		camera,
	} = props;

	const { Title } = Typography;
	const { Text } = Typography;
	const { Option } = Select;

	// const [locationChange, setLocationChange] = useState(false);
	const [tempStartDate, setTempStartDate] = useState("");
	const [tempEndTime, setTempEndTime] = useState("");
	const [selectedLocation, setSelectedLocation] = useState([]);
	const [selectedLocationCode, setSelectedLocationCode] = useState([]);
	const [unit, setUnit] = useState("15M");

	const day = "일간 누적 통계";
	const week = "주간 누적 통계";
	const month = "월간 누적 통계";
	const search = "기간 별 데이터 조회";

	const handleUnitSelectChange = (value) => {
		setUnit(value);
	};

	const handleSearch = () => {
		if (
			tempStartDate !== "" &&
			tempEndTime !== ""
			// && selectedLocation.length !== 0
		) {
			setFirstFilter(true);
			setStartDate(tempStartDate);
			setEndTime(tempEndTime);
			// setLocationInfo(selectedLocation);
			// setLocationCodeInfo(selectedLocationCode);
			if (period === "SERACH") {
				setSearchUnit(unit);
			}
		} else if (tempStartDate !== "" && tempEndTime !== "" && camera !== "") {
			setFirstFilter(true);
			setStartDate(tempStartDate);
			setEndTime(tempEndTime);
			if (period === "SERACH") {
				setSearchUnit(unit);
			}
		} else {
			console.log("need to select start time, end time, location");
		}
	};

	return (
		<div className="search-area">
			<Title level={4} style={{ marginBottom: 25 }}>
				{period === "DAY"
					? day
					: period === "WEEK"
					? week
					: period === "MONTH"
					? month
					: search}
			</Title>
			<div className="search-area-body">
				<div className="search-area-input">
					<Cascader
						setSelectedLocation={setSelectedLocation}
						setSelectedLocationCode={setSelectedLocationCode}
						// setLocationChange={setLocationChange}
					/>
					<DatePicker
						period={period}
						setTempStartDate={setTempStartDate}
						setTempEndTime={setTempEndTime}
					/>
					<div className="search-area-switch">
						<Space>
							<Text strong style={{ marginRight: 1 }}>
								시간별 기준
							</Text>
							<Switch
								defaultChecked={classification}
								checked={classification}
								onChange={(checked) => setClassification(checked)}
							/>
						</Space>
						<Space>
							<Text strong style={{ marginRight: 1 }}>
								차선별 기준
							</Text>
							<Switch
								defaultChecked={!classification}
								checked={!classification}
								onChange={(checked) => setClassification(!checked)}
							/>
						</Space>
					</div>
					{period === "SEARCH" ? (
						<Select onChange={handleUnitSelectChange} defaultValue="15M">
							<Option value="15M">15분 단위</Option>
							<Option value="1H">1시간 단위</Option>
						</Select>
					) : (
						classification === false &&
						(period === "WEEK" ? (
							<MultiRadio page={period} />
						) : period === "MONTH" ? (
							<MultiRadio page={period} />
						) : null)
					)}
				</div>
				<div className="search-area-input-button">
					<Button
						type="primary"
						style={{ marginBottom: 10 }}
						onClick={handleSearch}
					>
						조회
					</Button>
					<Button>전체 다운로드</Button>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
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
		setLocationCodeInfo: (selectedOptionCode) => {
			dispatch(actions.setLocationCode(selectedOptionCode));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SeachData);
