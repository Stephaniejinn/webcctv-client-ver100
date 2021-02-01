import React from "react";
import { Breadcrumb } from "antd";

const myBreadcrumb = ({ pageHierarchy, locationHierarchy = [] }) => {
	return (
		<Breadcrumb style={{ margin: "16px 0" }} separator="·">
			{pageHierarchy.concat(locationHierarchy).map((item) => (
				<Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
			))}
		</Breadcrumb>
	);
};

export default myBreadcrumb;
