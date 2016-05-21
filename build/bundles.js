module.exports = {
	"bundles": {
		"dist/app-build": {
			"includes": [
				"[**/*.js]",
				"**/*.html!text",
				"**/*.css!text"
			],
			"options": {
				"inject": true,
				"minify": true,
				"depCache": true,
				"rev": false
			}
		},
		"dist/aurelia": {
			"includes": [
				"aurelia-bootstrapper",
				"aurelia-event-aggregator",
				"aurelia-fetch-client",
				"aurelia-framework",
				"aurelia-history-browser",
				"aurelia-loader-default",
				"aurelia-logging-console",
				"aurelia-pal-browser",
				"aurelia-polyfills",
				"aurelia-router",
				"aurelia-templating-binding",
				"aurelia-templating-resources",
				"aurelia-templating-router"
			],
			"options": {
				"inject": true,
				"minify": true,
				"depCache": false,
				"rev": false
			}
		}
	}
};
