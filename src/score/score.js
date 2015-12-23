import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Score {
	constructor(eventAggregator) {
		this.red = localStorage.red || 0;
		this.blue = localStorage.blue || 0;
		this.unsubscribe = eventAggregator.subscribe('keydown', event => this.keydown(event));
	}

	keydown(event) {
		if(!event.metaKey && !event.ctrlKey && !event.alt && !event.shift) {
			if(event.keyCode === 82) {
				this.addRedScore();
			} else if(event.keyCode === 66) {
				this.addBlueScore();
			}
		}
	}

	addRedScore() {
		localStorage.red = ++this.red;
	}

	addBlueScore() {
		localStorage.blue = ++this.blue;
	}

	detached() {
		this.unsubscribe.dispose();
	}
}
