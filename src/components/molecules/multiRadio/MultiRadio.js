import React from "react";
import { Radio } from "antd";

const MultiRadio = ({ page }) => {
	return (
		<div className="multi-radio">
			{page === "WEEK" ? (
				<div>
					<Radio>월</Radio>
					<Radio>화</Radio>
					<Radio>수</Radio>
					<Radio>목</Radio>
					<Radio>금</Radio>
					<Radio>토</Radio>
					<Radio>일</Radio>
				</div>
			) : page === "MONTH" ? (
				<>
					<Radio>1주</Radio>
					<Radio>2주</Radio>
					<Radio>3주</Radio>
					<Radio>4주</Radio>
					<Radio>5주</Radio>
				</>
			) : null}
		</div>
	);
};

export default MultiRadio;
