import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Events {
	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
		document.addEventListener('keydown', event => this.keydown(event));
	}

	keydown(event) {
		switch(event.keyCode) {
			case 70:
				this.toggleFullscreen();
				break;
			default:
				this.eventAggregator.publish('keydown', event);
				break;
		}
	}

	toggleFullscreen() {
		if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
			let elem = document.querySelector('body');
			if(elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if(elem.webkitRequestFullscreen) {
				elem.webkitRequestFullscreen();
			} else if(elem.mozRequestFullScreen) {
				elem.mozRequestFullScreen();
			} else if(elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}
}
