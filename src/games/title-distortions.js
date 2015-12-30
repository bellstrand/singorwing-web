import {inject, LogManager} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, Router, EventAggregator)
export class TitleDistortions {
	constructor(http, router, eventAggregator) {
		this.router = router;
		this.eventAggregator = eventAggregator;
		this.logger = LogManager.getLogger('TitleDistortions');
		http.fetch('songs/distortions').then(response => response.json()).then(songs => {
			this.init(songs);
		}).catch(() => {});
	}

	init(songs) {
		this.index = 0;
		this.songs = songs;
		this.distortion = this.getDistortion();
		this.logInfo();
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

	getDistortion() {
		return this.songs[this.index].distortions[Math.floor(Math.random() * this.songs[this.index].distortions.length)];
	}

	next() {
		this.index = this.index !== this.songs.length - 1 ? this.index + 1 : 0;
		this.distortion = this.getDistortion();
		this.logInfo();
	}

	previous() {
		this.index = this.index !== 0 ? this.index - 1 : this.songs.length - 1;
		this.distortion = this.getDistortion();
		this.logInfo();
	}

	logInfo() {
		this.logger.info('Artist: ' + this.songs[this.index].artist.name);
		this.logger.info('Song: ' + this.songs[this.index].name);
		this.logger.info('Distortion: ' + this.distortion.distortion);
		this.logger.info('');
	}

	quit() {
		this.router.navigateToRoute('games');
	}
}
