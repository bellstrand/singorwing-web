export function configure(aurelia) {
	aurelia.use
		.developmentLogging()
		.defaultBindingLanguage()
		.defaultResources()
		.history()
		.router()
		.eventAggregator();

	aurelia.start().then(() => aurelia.setRoot());
}
