import React from "react";
import { Typography } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchDrawer from "../../molecules/searchDrawer/SearchDrawer";

const RealtimeStatUpper = (props) => {
	const { Title } = Typography;
	const { city, district, road, spot, camera } = props;

	return (
		<>
			<Breadcrumb
				pageHierarchy={["대시보드", "실시간 데이터"]}
				locationHierarchy={[city, district, road, spot]}
			/>
			<div className="page-title-and-search-input">
				<Title level={3} style={{ minWidth: 285 }}>
					실시간 통계 | {camera}
				</Title>
				<div className="search-input-drawer">
					<SearchDrawer />
				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RealtimeStatUpper);
