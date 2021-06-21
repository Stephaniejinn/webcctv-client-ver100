import React, { useState } from "react";
import { Typography, Button, Radio, message, Tooltip } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import Cascader from "../../atoms/cascader/Cascader";
import DatePicker from "../../atoms/datePicker/DatePicker";
import TimeFilter from "../../molecules/timeFilter/TimeFilter";
import NotificationButton from "../../atoms/notificationButton/NotificationButton";

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
		cascaderText,
		emptyErr,
		futureErr,
		over31Err,
	} = props;

	const { Title } = Typography;
	const { Text } = Typography;

	const [tempStartDate, setTempStartDate] = useState("");
	const [tempEndTime, setTempEndTime] = useState("");
	const [selectedLocation, setSelectedLocation] = useState([]);
	const [selectedLocationCode, setSelectedLocationCode] = useState([]);
	const [additionalFilterValue, setAddValue] = useState("ALL");
	const [additionalFilterChanged, setAddChanged] = useState(false);

	const day = "일간 누적 통계";
	const week = "주간 누적 통계";
	const month = "월간 누적 통계";
	const search = "기간 별 데이터 조회";
	const overspeed = "과속 데이터 조회 ";
	const tooltipText = `조회 버튼을 클릭하여 선택한 구간과 날짜의 ${
		period === "OVERSPEED"
			? "과속 데이터를 페이지에 표시 합니다"
			: period === "SEARCH"
			? `교통 정보 및 과속 데이터를 페이지에 표시 합니다`
			: `${
					period === "DAY" ? day : period === "WEEK" ? week : month
			  }정보를 확인할 수 있습니다`
	}`;

	const descriptionText = (
		<>
			<Text>
				{period === "DAY"
					? "페이지에 출력되는 일간 누적 통계의 기준을 선택합니다"
					: `페이지에 출력되는 ${
							period === "WEEK" ? "주" : "월"
					  }간 누적 통계의 기준을 선택합니다. 기준 선택이 차선별인 경우 평일 혹은 주말로 구분 가능합니다.`}
			</Text>
		</>
	);
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
			tempStartDate !== "Invalid date" &&
			tempEndTime !== "Invalid date" &&
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
				firstFilter === true &&
				!additionalFilterChanged
			) {
				if (emptyErr) {
					message.warning("해당 기간 데이터가 없습니다");
				} else if (futureErr) {
					if (over31Err) {
						message.warning("최대 31일까지 조회 할 수 있습니다");
					} else {
						message.warning("분석이 완료되지 않은 기간에 대한 검색입니다");
					}
				} else {
					message.success("이미 조회된 데이터입니다");
				}
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
						setAddFilter(additionalFilterValue);
						setAddChanged(false);
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
							cascaderText={cascaderText}
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
									style={{ marginRight: 5 }}
								>
									<Radio.Button value={true}>시간별</Radio.Button>
									<Radio.Button value={false}>차선별</Radio.Button>
								</Radio.Group>
								<NotificationButton
									message="조회기준"
									description={descriptionText}
								/>
							</div>
						) : null}
					</div>

					{classification === false &&
						(period === "WEEK" || period === "MONTH" ? (
							<div className="search-area-input-radio">
								<TimeFilter
									page={period}
									value={additionalFilterValue}
									setValue={setAddValue}
									setChanged={setAddChanged}
								/>
							</div>
						) : null)}
				</div>

				<div className="search-area-input-button">
					<Tooltip placement="topLeft" title={tooltipText}>
						<Button
							type="primary"
							style={{ marginBottom: 7, width: 119, height: 38 }}
							onClick={handleSearch}
						>
							조회
						</Button>
					</Tooltip>
					{period === "SEARCH" && (
						<Tooltip
							placement="topLeft"
							title="다운로드 버튼을 클릭하여 선택된 구간과 날짜의 교통 정보 및 과속 데이터를 엑셀 파일로 다운로드 받을 수 있습니다"
						>
							<Button disabled>전체 다운로드</Button>
						</Tooltip>
					)}
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
