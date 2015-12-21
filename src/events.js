import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Events {
	constructor(eventAggregator) {
		document.addEventListener('keydown', event => {
			eventAggregator.publish('keydown', event);
		});
	}
}
