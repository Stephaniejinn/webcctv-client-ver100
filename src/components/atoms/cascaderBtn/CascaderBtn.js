import React from "react";
import { Button } from "antd";

import MyCascader from "../cascader/Cascader";

import "./style.less";

const CascaderWButton = () => {
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
