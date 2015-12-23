import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(HttpClient, Router, EventAggregator)
export class FindSong {
	constructor(http, router, eventAggregator) {
		http.fetch('find-songs').then(response => response.json()).then(findSongs => {
			this.init(findSongs);
		}).catch(() => {});
		this.router = router;
		this.eventAggregator = eventAggregator;
	}

	init(findSongs) {
		this.index = 0;
		this.findSongs = findSongs;
		this.findSong = this.findSongs[this.index];
		this.generateRivets();
		this.logInfo();
		this.unsubscribe = this.eventAggregator.subscribe('keydown', event => this.keydown(event.keyCode));
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
		this.index = this.index !== this.findSongs.length - 1 ? this.index + 1 : 0;
		this.findSong = this.findSongs[this.index];
		this.generateRivets();
		this.logInfo();
	}

	previous() {
		this.index = this.index !== 0 ? this.index - 1 : this.findSongs.length - 1;
		this.findSong = this.findSongs[this.index];
		this.generateRivets();
		this.logInfo();
	}

	logInfo() {
		console.log('Song: ' + this.findSong.song.name);
		console.log('Phrase: ' + this.findSong.phrase);
		console.log(' ');
	}

	quit() {
		this.router.navigateToRoute('games');
	}
}
