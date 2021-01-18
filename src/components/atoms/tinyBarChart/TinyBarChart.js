import React from "react";
import { TinyColumn } from "@ant-design/charts";

const MyTinyColumn = () => {
	var data = [274, 337, 81, 497];
	var config = {
		autoFit: true,
		data: data,
		tooltip: {
			customContent: function customContent(x, data) {
				var _data$, _data$$data;
				return "NO."
					.concat(x, ": ")
					.concat(
						(_data$ = data[0]) === null || _data$ === void 0
							? void 0
							: (_data$$data = _data$.data) === null || _data$$data === void 0
							? void 0
							: _data$$data.y.toFixed(2)
					);
			},
		},
	};
	return <TinyColumn {...config} />;
};
export default MyTinyColumn;
