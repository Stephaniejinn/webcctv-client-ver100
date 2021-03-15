import React, { useState } from "react";
import { Radio, Typography, Checkbox } from "antd";

import SingleRadio from "../singleRadio/SingleRadio";

import "./style.less";

const MultiRadio = ({ page }) => {
	const { Text } = Typography;
	const [multiSelected, setSelected] = useState(false);

	const weeklyOptions = [
		{ label: "월", value: "MON" },
		{ label: "화", value: "TUE" },
		{ label: "수", value: "WED" },
		{ label: "목", value: "THUR" },
		{ label: "금", value: "FRI" },
		{ label: "토", value: "SAT" },
		{ label: "일", value: "SUN" },
	];
	const monthlyOptions = [
		{ label: "1주", value: "1" },
		{ label: "2주", value: "2" },
		{ label: "3주", value: "3" },
		{ label: "4주", value: "4" },
	];

	const handleCheckboxChange = (checkedValues) => {
		console.log(checkedValues);
		if (page === "WEEK") {
			if (checkedValues.length !== 0) {
				setSelected(true);
			} else {
				setSelected(false);
			}
		}
	};
	return (
		<div className="multi-radio-body">
			<Text strong style={{ marginRight: 10, minWidth: 60, marginTop: 4 }}>
				선택사항
			</Text>
			{page === "WEEK" ? (
				<div className="single-radio-group">
					<SingleRadio page={page} multiSelected={multiSelected} />
					<div className="multi-radio">
						<Checkbox.Group
							options={weeklyOptions}
							onChange={handleCheckboxChange}
						/>
					</div>
				</div>
			) : (
				page === "MONTH" && (
					<div className="single-radio-group-col">
						<div className="multi-radio">
							<Checkbox.Group
								options={monthlyOptions}
								onChange={handleCheckboxChange}
							/>
						</div>
						<SingleRadio page={page} />
					</div>
				)
			)}
		</div>
	);
};

export default MultiRadio;
