export function configure(aurelia) {
	aurelia.use
		.defaultBindingLanguage()
		.defaultResources()
		.history()
		.router()
		.eventAggregator()
		.developmentLogging();

	aurelia.start().then(() => aurelia.setRoot());
}
