import environment from './environment';
import {LogManager} from 'aurelia-framework';
import {ConsoleAppender} from 'aurelia-logging-console';

Promise.config({
	longStackTraces: false,
	warnings: false
});

if(environment.debug) {
	LogManager.addAppender(new ConsoleAppender());
	LogManager.setLevel(LogManager.logLevel.debug);
}

export function configure(aurelia) {
	aurelia.use
		.standardConfiguration()
		.feature('resources');

	if(environment.testing) {
		aurelia.use.plugin('aurelia-testing');
	}

	aurelia.start().then(() => aurelia.setRoot());
}
