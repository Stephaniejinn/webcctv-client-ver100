import React from "react";
import axios from "axios";
import { Button } from "antd";

import MyCascader from "../cascader/Cascader";

import "./style.less";

const CascaderWButton = () => {
	// const onSubmit = (values) => {
	// 	axios
	// 		.get("http://119.197.240.186:3002/api/v1/locations/cities", {
	// 			headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
	// 		})
	// 		.then((res) => {
	// 			res.data.map((cityInfo) => {
	// 				const { cityCode, cityName } = cityInfo;
	// 				console.log(cityCode);
	// 			});
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	return (
		<div className="cascader-with-button">
			<MyCascader size="large" />
			<Button size="large" type="primary">
				검색
			</Button>
		</div>
	);
};
export default CascaderWButton;
