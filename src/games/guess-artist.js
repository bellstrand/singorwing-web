import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {shuffle} from '../utils/shuffle';

@inject(HttpClient, Router, EventAggregator)
export class GuessArtist {
	constructor(http, router, eventAggregator) {
		this.router = router;
		this.eventAggregator = eventAggregator;
		http.fetch('artists').then(response => response.json()).then(artists => {
			this.init(artists);
		}).catch(() => {});
	}

	init(artists) {
		this.index = 0;
		this.artists = shuffle(artists);
		this.artist = this.artists[this.index];
		this.unsubscribe = this.eventAggregator.subscribe('keydown', event => this.keydown(event.keyCode));
	}

	detached() {
		this.unsubscribe.dispose();
	}

	keydown(keyCode) {
		switch(keyCode) {
			case 37: this.previous(); break;
			case 39: this.next(); break;
			case 81: this.quit(); break;
		}
	}

	next() {
		this.index = this.index !== this.artists.length - 1 ? this.index + 1 : 0;
		this.artist = this.artists[this.index];
	}

	previous() {
		this.index = this.index !== 0 ? this.index - 1 : this.artists.length - 1;
		this.artist = this.artists[this.index];
	}

	quit() {
		this.router.navigateToRoute('games');
	}
}
