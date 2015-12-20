import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class SongList {
	constructor(http, router) {
		this.router = router;
		http.fetch('songs').then(response => response.json()).then(songs => {
			this.songs = songs;
			this.filter(this.search);
		}).catch(() => {});
	}

	filter(search) {
		if(search) {
			let found;
			search = search.toLowerCase();
			this.filteredSongs = this.songs.filter(song => {
				found = false;
				Object.keys(song).forEach(prop => {
					if(typeof song[prop] === 'string' && song[prop].toLowerCase().indexOf(search) !== -1) {
						found = true;
					}
				});
				return found;
			});
		} else {
			this.filteredSongs = this.songs;
		}
	}
}
