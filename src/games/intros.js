import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {shuffle} from '../utils/shuffle';
import youTubePlayer from 'youtube-player';

@inject(HttpClient, Router, EventAggregator)
export class Intros {
	title = '';

	constructor(http, router, eventAggregator) {
		this.http = http;
		this.router = router;
		this.eventAggregator = eventAggregator;
	}

	attached() {
		this.player = youTubePlayer('player');
		this.player.setVolume(100);
		this.http.fetch('intros').then(response => response.json()).then(intros => {
			this.init(intros);
		}).catch(() => {});
	}

	init(intros) {
		this.index = 0;
		this.intros = shuffle(intros);
		this.intro = this.intros[this.index];
		this.loadAndPlayVideo();
		this.unsubscribe = this.eventAggregator.subscribe('keydown', event => this.keydown(event.keyCode));
	}

	loadAndPlayVideo() {
		this.title = '';
		this.http.fetch('artists/' + this.intro.song.artist).then(response => response.json()).then(artist => {
			this.artist = artist;
		}).catch(() => {
			this.artist = {};
		});
		this.player.loadVideoByUrl({
			mediaContentUrl: 'https://www.youtube.com/v/' + this.intro.videoId,
			startSeconds: this.intro.start,
			endSeconds: this.intro.end,
			suggestedQuality: 'default'
		});
	}

	playPause() {
		this.player.getPlayerState().then(state => {
			if(state === 1) {
				this.player.pauseVideo();
			} else {
				this.player.playVideo();
			}
		});
	}

	playChorus() {
		this.title = this.artist.name + ' - ' + this.intro.song.name;
		this.player.seekTo(this.intro.chorus);
		this.player.playVideo();
	}

	detached() {
		this.unsubscribe.dispose();
	}

	keydown(keyCode) {
		switch(keyCode) {
			case 13: this.playChorus(); break;
			case 32: this.playPause(); break;
			case 37: this.previous(); break;
			case 39: this.next(); break;
			case 81: this.quit(); break;
		}
	}

	next() {
		this.index = this.index !== this.intros.length - 1 ? this.index + 1 : 0;
		this.intro = this.intros[this.index];
		this.loadAndPlayVideo();
	}

	previous() {
		this.index = this.index !== 0 ? this.index - 1 : this.intros.length - 1;
		this.intro = this.intros[this.index];
		this.loadAndPlayVideo();
	}

	quit() {
		this.router.navigateToRoute('games');
	}
}
