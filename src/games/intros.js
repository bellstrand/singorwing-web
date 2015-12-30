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
		this.http.fetch('songs/intros').then(response => response.json()).then(songs => {
			this.init(songs);
		}).catch(() => {});
	}

	init(songs) {
		this.index = 0;
		this.songs = shuffle(songs);
		this.song = this.songs[this.index];
		this.loadAndPlayVideo();
		this.unsubscribe = this.eventAggregator.subscribe('keydown', event => this.keydown(event.keyCode));
	}

	loadAndPlayVideo() {
		this.title = '';
		console.log(this.song.intro.end);
		console.log(this.song.intro.end | 999);
		console.log(this.song.intro.end || 999);
		this.player.loadVideoByUrl({
			mediaContentUrl: 'https://www.youtube.com/v/' + this.song.intro.videoId,
			startSeconds: this.song.intro.start || 0,
			endSeconds: this.song.intro.end || 999,
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
		this.title = this.song.artist.name + ' - ' + this.song.name;
		this.player.seekTo(this.song.intro.chorus || 0);
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
		this.index = this.index !== this.songs.length - 1 ? this.index + 1 : 0;
		this.song = this.songs[this.index];
		this.loadAndPlayVideo();
	}

	previous() {
		this.index = this.index !== 0 ? this.index - 1 : this.songs.length - 1;
		this.song = this.songs[this.index];
		this.loadAndPlayVideo();
	}

	quit() {
		this.router.navigateToRoute('games');
	}
}
