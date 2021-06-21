const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "#27335c",
							"box-shadow-base":
								"0 4px 10px 0 rgba(20, 19, 34, 0.03), 0 0 10px 0 rgba(20, 19, 34, 0.02)",
							"border-color-base": "#e4e9f0",
							"text-color": "#141322",
							"text-color-secondary": "#595c97",
							theme: "light",
							"font-family": "Arial",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
