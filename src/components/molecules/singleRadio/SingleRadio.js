import React, { useState } from "react";
import { Radio } from "antd";

// import "./style.less";

const SingleRadio = (props) => {
	const { page, multiSelected } = props;
	const [value, setValue] = useState(1);
	const onChange = (e) => {
		console.log("radio checked", e.target.value);
		setValue(e.target.value);
	};
	return (
		<>
			<Radio.Group onChange={onChange} value={value} defaultValue={1}>
				{console.log(multiSelected)}
				<Radio value={1} disabled={multiSelected}>
					전체
				</Radio>
				<Radio value={2} disabled={multiSelected}>
					평일
				</Radio>
				<Radio value={3} disabled={multiSelected}>
					주말
				</Radio>
				{page === "MONTH" && (
					<>
						<Radio value={4}>월</Radio>
						<Radio value={5}>화</Radio>
						<Radio value={6}>수</Radio>
						<Radio value={7}>목</Radio>
						<Radio value={8}>금</Radio>
						<Radio value={9}>토</Radio>
						<Radio value={10}>일</Radio>
					</>
				)}
			</Radio.Group>
		</>
	);
};

export default SingleRadio;
