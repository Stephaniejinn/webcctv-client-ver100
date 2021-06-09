import React, { useState } from "react";
import { Typography, Button, Radio, message } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import Cascader from "../../atoms/cascader/Cascader";
import DatePicker from "../../atoms/datePicker/DatePicker";
import TimeFilter from "../../molecules/timeFilter/TimeFilter";

import "./style.less";

const SeachData = (props) => {
	const {
		period,
		classification,
		setClassification,
		setStartDate,
		setEndTime,
		setFirstFilter,
		setLocationInfo,
		setLocationCodeInfo,
		camera,
		setAddFilter,
		setCount,
		setDateInfo,
		startDate,
		endDate,
		firstFilter,
		setLoggedIn,
		setRefresh,
	} = props;

	const { Title } = Typography;
	const { Text } = Typography;

	const [tempStartDate, setTempStartDate] = useState("");
	const [tempEndTime, setTempEndTime] = useState("");
	const [selectedLocation, setSelectedLocation] = useState([]);
	const [selectedLocationCode, setSelectedLocationCode] = useState([]);
	const [additionFilterValue, setValue] = useState("ALL");

	const day = "일간 누적 통계";
	const week = "주간 누적 통계";
	const month = "월간 누적 통계";
	const search = "기간 별 데이터 조회";
	const overspeed = "과속 데이터 조회 ";

	var timer;
	const spinTimer = () => {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			setCount(true);
		}, 200);
		return () => clearTimeout(timer);
	};

	const handleSearch = () => {
		var dateInfo = {};
		if (
			tempStartDate !== "" &&
			tempEndTime !== "" &&
			Object.keys(selectedLocation).length !== 0
		) {
			//if location change
			if (period === "OVERSPEED") {
				spinTimer();
				setFirstFilter(true);
				setStartDate(tempStartDate);
				setEndTime(tempEndTime);
				setLocationInfo(selectedLocation);
				setLocationCodeInfo(selectedLocationCode);
				dateInfo["startDate"] = tempStartDate;
				dateInfo["endDate"] = tempEndTime;
				setDateInfo(dateInfo);
				setRefresh(true);
			} else if (
				tempStartDate === startDate &&
				tempEndTime === endDate &&
				selectedLocation["camera"] === camera &&
				firstFilter === true
			) {
				message.success("이미 조회된 데이터입니다");
			} else {
				spinTimer();
				setFirstFilter(true);
				setStartDate(tempStartDate);
				setEndTime(tempEndTime);
				setLocationInfo(selectedLocation);
				setLocationCodeInfo(selectedLocationCode);
				dateInfo["startDate"] = tempStartDate;
				dateInfo["endDate"] = tempEndTime;
				setDateInfo(dateInfo);
				if (setAddFilter) {
					if (!classification) {
						setAddFilter(additionFilterValue);
					}
				}
			}
		} else {
			message.warning("카메라 위치, 시작일, 종료일 선택 해주세요");
		}
	};

	return (
		<div className="search-area">
			<Title level={4} style={{ marginBottom: 25, minWidth: 400 }}>
				{period === "DAY"
					? day
					: period === "WEEK"
					? week
					: period === "MONTH"
					? month
					: period === "OVERSPEED"
					? overspeed
					: search}
			</Title>
			<div className="search-area-body">
				<div className="search-area-input">
					<div className="search-area-input">
						<Cascader
							setSelectedLocation={setSelectedLocation}
							setSelectedLocationCode={setSelectedLocationCode}
							setLoggedIn={setLoggedIn}
						/>
						<DatePicker
							period={period}
							setTempStartDate={setTempStartDate}
							setTempEndTime={setTempEndTime}
						/>
						{period !== "SEARCH" && period !== "OVERSPEED" ? (
							<div className="search-area-radio">
								<Text
									strong
									style={{ marginRight: 10, minWidth: 60, marginTop: 4 }}
								>
									조회기준
								</Text>
								<Radio.Group
									defaultChecked={true}
									value={classification}
									onChange={(e) => setClassification(e.target.value)}
									optionType="button"
								>
									<Radio.Button value={true}>시간별</Radio.Button>
									<Radio.Button value={false}>차선별</Radio.Button>
								</Radio.Group>
							</div>
						) : null}
					</div>

					{classification === false &&
						(period === "WEEK" || period === "MONTH" ? (
							<div className="search-area-input-radio">
								<TimeFilter
									page={period}
									value={additionFilterValue}
									setValue={setValue}
								/>
							</div>
						) : null)}
				</div>

				<div className="search-area-input-button">
					<Button
						type="primary"
						style={{ marginBottom: 7, width: 119, height: 38 }}
						onClick={handleSearch}
					>
						조회
					</Button>
					{period === "SEARCH" && <Button disabled>전체 다운로드</Button>}
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = (state) => {
	return {
		camera: state.location.camera,
		startDate: state.date.startDate,
		endDate: state.date.endDate,
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
		setDateInfo: (dateInfo) => {
			dispatch(actions.setDateInfo(dateInfo));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(SeachData);
