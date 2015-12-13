import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class ArtistList {
	constructor(http, router) {
		this.router = router;
		http.fetch('artists').then(response => response.json()).then(artists => {
			this.artists = artists;
			this.filter(this.search);
		}, () => {});
	}

	filter(search) {
		if(search) {
			let found;
			search = search.toLowerCase();
			this.filteredArtists = this.artists.filter(user => {
				found = false;
				Object.keys(user).forEach(prop => {
					if(typeof user[prop] === 'string' && user[prop].toLowerCase().indexOf(search) !== -1) {
						found = true;
					}
				});
				return found;
			});
		} else {
			this.filteredArtists = this.artists;
		}
	}
}
