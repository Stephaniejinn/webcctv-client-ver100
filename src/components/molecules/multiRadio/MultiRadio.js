import React, { useState } from "react";
import { Radio, Typography } from "antd";

import SingleRadio from "../singleRadio/SingleRadio";

import "./style.less";

const { Text } = Typography;

const MultiRadio = ({ page }) => {
	return (
		<div className="multi-radio-body">
			<Text strong style={{ marginRight: 1 }}>
				선택사항
			</Text>
			<div className="single-radio-group">
				{page === "WEEK" ? (
					<div className="multi-radio">
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
						<div className="multi-radio">
							<Radio>1주</Radio>
							<Radio>2주</Radio>
							<Radio>3주</Radio>
							<Radio>4주</Radio>
							<Radio>5주</Radio>
						</div>
						<SingleRadio />
					</>
				) : page === "SEARCH" ? (
					<>
						<div className="multi-radio">
							<Radio>1주</Radio>
							<Radio>2주</Radio>
							<Radio>3주</Radio>
							<Radio>4주</Radio>
							<Radio>5주</Radio>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};

export default MultiRadio;
