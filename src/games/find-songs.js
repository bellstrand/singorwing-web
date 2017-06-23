import {inject, LogManager} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, Router, EventAggregator)
export class FindSong {
	constructor(http, router, eventAggregator) {
		this.router = router;
		this.eventAggregator = eventAggregator;
		this.logger = LogManager.getLogger('FindSong');
		http.fetch('songs/find-songs').then(response => response.json()).then(songs => {
			this.init(songs);
		}).catch(() => {});
	}

	init(songs) {
		this.index = 0;
		this.songs = songs;
		this.findSong = this.getFindSong();
		this.generateRivets();
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

	show(index) {
		document.querySelectorAll('.find-songs .index')[index].style.visibility = 'hidden';
		document.querySelectorAll('.find-songs .word')[index].style.visibility = 'visible';
		if(this.rivets.indexOf(index) !== -1) {
			document.querySelectorAll('.find-songs .phrase div')[index].style.background = '#a00';
		}
	}

	getFindSong() {
		return this.songs[this.index].findSongs[Math.floor(Math.random() * this.songs[this.index].findSongs.length)];
	}

	generateRivets() {
		this.rivets = [];
		let phraseLength = this.findSong.phrase.split(' ').length;
		if(phraseLength > 2) {
			let numberOfRivets = (phraseLength < 8) ? 2 : 3;
			while(this.rivets.length < numberOfRivets) {
				let randomNumber = Math.floor(Math.random() * phraseLength);
				if(this.rivets.indexOf(randomNumber) === -1) {
					this.rivets.push(randomNumber);
				}
			}
		}
	}

	next() {
		this.index = this.index !== this.songs.length - 1 ? this.index + 1 : 0;
		this.findSong = null;
		setTimeout(() => {
			this.findSong = this.getFindSong();
			this.generateRivets();
			this.logInfo();
		}, 1);
	}

	previous() {
		this.index = this.index !== 0 ? this.index - 1 : this.songs.length - 1;
		this.findSong = null;
		setTimeout(() => {
			this.findSong = this.getFindSong();
			this.generateRivets();
			this.logInfo();
		}, 1);
	}

	logInfo() {
		this.logger.info('Artist: ' + this.songs[this.index].artist.name);
		this.logger.info('Song: ' + this.songs[this.index].name);
		this.logger.info('Phrase: ' + this.findSong.phrase);
		this.logger.info('');
	}

	quit() {
		this.router.navigateToRoute('games');
	}
}
