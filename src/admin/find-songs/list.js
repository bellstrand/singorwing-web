import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class FindSongList {
	constructor(http, router) {
		this.router = router;
		http.fetch('find-songs').then(response => response.json()).then(findSongs => {
			this.findSongs = findSongs;
			this.filter(this.search);
		}).catch(() => {});
	}

	filter(search) {
		if(search) {
			let found;
			search = search.toLowerCase();
			this.filteredFindSongs = this.findSongs.filter(findSong => {
				found = false;
				Object.keys(findSong).forEach(prop => {
					if(typeof findSong[prop] === 'string' && findSong[prop].toLowerCase().indexOf(search) !== -1) {
						found = true;
					}
				});
				found = findSong.song.name.toLowerCase().indexOf(search) !== -1 ? true : found;
				return found;
			});
		} else {
			this.filteredFindSongs = this.findSongs;
		}
	}
}
