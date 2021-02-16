import React, { Component } from "react";
import { Typography } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../actions";

import Breadcrumb from "../../atoms/breadcrumb/Breadcrumb";
import SearchDrawer from "../../molecules/searchDrawer/SearchDrawer";

class RealtimeStatUpper extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const { Title } = Typography;

		return (
			<>
				<Breadcrumb
					pageHierarchy={["데시보드", "실시간 데이터"]}
					locationHierarchy={["인천광역시", "중구", "수인사거리1[하행]"]}
				/>
				<div className="page-title-and-search-input">
					<Title level={3} style={{ minWidth: 285 }}>
						실시간 통게 | {this.props.camera}
					</Title>
					<div className="search-input-drawer">
						<SearchDrawer />
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state.location.cameras);
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
