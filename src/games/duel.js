import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {shuffle} from '../utils/shuffle';

@inject(HttpClient, Router, EventAggregator)
export class Duel {
	constructor(http, router, eventAggregator) {
		this.router = router;
		this.eventAggregator = eventAggregator;
		http.fetch('duel-themes').then(response => response.json()).then(duelThemes => {
			this.init(duelThemes);
		}).catch(() => {});
	}

	init(duelThemes) {
		this.index = 0;
		this.duelThemes = shuffle(duelThemes);
		this.duelTheme = this.duelThemes[this.index];
		this.unsubscribe = this.eventAggregator.subscribe('keydown', event => this.keydown(event.keyCode));
	}

	keydown(keyCode) {
		switch(keyCode) {
			case 37: this.previous(); break;
			case 39: this.next(); break;
			case 81: this.quit(); break;
		}
	}

	next() {
		this.index = this.index !== this.duelThemes.length - 1 ? this.index + 1 : 0;
		this.duelTheme = this.duelThemes[this.index];
	}

	previous() {
		this.index = this.index !== 0 ? this.index - 1 : this.duelThemes.length - 1;
		this.duelTheme = this.duelThemes[this.index];
	}

	quit() {
		this.router.navigateToRoute('games');
	}
}
