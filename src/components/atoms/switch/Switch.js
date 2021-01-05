import React from "react";
// import { connect } from "react-redux";
import { Switch, Typography, Space } from "antd";

// import { selectClassification } from "../../../actions";

const MySwitch = ({ label, checkState, setClassification, classification }) => {
	const { Text } = Typography;
	// console.log("switch", typeof setClassification);
	console.log(classification);

	const onChange = (checked) => {
		if ({ label } === "시간별 기준" && checked === true) {
			setClassification(true);
		} else if ({ label } === "차선별 기준" && checked === true) {
			setClassification(false);
		} else {
			setClassification(checked);
		}

		console.log(`switch to ${label}${checked}`);
		console.log(classification);
	};
	// console.log('props',props)
	return (
		<Space>
			{/* <div className = "switch-layout"> */}
			<Text strong style={{ marginRight: 1 }}>
				{label}
			</Text>
			<Switch
				defaultChecked={checkState}
				checked={classification}
				onChange={onChange}
			/>
			{/* </div> */}
		</Space>
	);
};

// const mapStatetoProps = state =>{
//   console.log('current',state.selectdClassification)
//   return {classification: state.selectdClassification}
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     onChange: () => dispatch(selectClassification)
//   }
// };

// export default connect(mapStatetoProps,mapDispatchToProps)(MySwitch);
export default MySwitch;
