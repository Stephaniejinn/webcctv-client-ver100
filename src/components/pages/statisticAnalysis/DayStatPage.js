import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions";

import Sider from "../../organisms/sider";
import Header from "../../organisms/header";
import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchData from "../../organisms/searchData/SearchData";
import GeneralVisualization from "../../organisms/generalVisualization/GeneralVisualization";
import TimeStatistic from "../../organisms/visualStatistic/timeStat/TimeStat";
import LaneStatistic from "../../organisms/visualStatistic/laneStat/LaneStat";

import "./style.less";

const DayStatPage = () => {
	const [timeClassification, setTimeClassification] = useState(true);
	const [firstFilter, setFirstFilter] = useState(false);
	const [startDate, setStartDate] = useState("");
	const [endTime, setEndTime] = useState("");
	const [count, setCount] = useState(false);

	const { Content } = Layout;

	return (
		<div className="statistic-page">
			<Layout style={{ minHeight: "100vh" }}>
				<Sider />
				<Layout className="site-layout">
					<Header />
					<Content style={{ margin: "0 16px" }}>
						<Breadcrumb pageHierarchy={["대시보드", "통계 분석", "일간 별"]} />
						<SearchData
							period="DAY"
							classification={timeClassification}
							setClassification={setTimeClassification}
							setStartDate={setStartDate}
							setEndTime={setEndTime}
							setFirstFilter={setFirstFilter}
							setCount={setCount}
						/>
						{firstFilter ? (
							count ? (
								<>
									<div className="statistic-general-visualization">
										<GeneralVisualization
											period="DAY"
											startDate={startDate}
											endTime={endTime}
										/>
									</div>
									{timeClassification ? (
										<TimeStatistic
											period="DAY"
											startDate={startDate}
											endTime={endTime}
											timeClassification={timeClassification}
											interval="15M"
										/>
									) : (
										<LaneStatistic
											period="DAY"
											startDate={startDate}
											endTime={endTime}
											timeClassification={timeClassification}
											interval="15M"
										/>
									)}
								</>
							) : (
								<div
									style={{
										marginTop: 20,
										marginBottom: 20,
										textAlign: "center",
										paddingTop: 30,
										paddingBottom: 30,
									}}
								>
									<Spin size="large" />
								</div>
							)
						) : null}
					</Content>
				</Layout>
			</Layout>
		</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(DayStatPage);
