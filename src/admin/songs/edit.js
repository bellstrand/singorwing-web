import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class SongEdit {
	song = {};
	artists = [];
	genres = ['anime', 'blues/jass', 'comedy', 'country', 'dance', 'disney', 'folk', 'hard rock', 'hip-hop/rap', 'metal', 'pop', 'punk', 'reggae', 'rock', 'world'];

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		this.http.fetch('artists').then(response => response.json()).then(artists => {
			this.artists = artists;
		}).catch(() => {});
		if(params.id) {
			this.http.fetch('songs/' + params.id).then(response => response.json()).then(song => {
				this.song = song;
			}).catch(() => {});
		}
	}

	setGenre(artistId) {
		this.artists.map(artist => {
			if(artist._id === artistId) {
				this.song.genre = artist.genre;
			}
		});
	}

	create() {
		this.http.fetch('songs', {
			method: 'post',
			body: json(this.song)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('songs');
		}).catch(() => {});
	}

	update() {
		this.http.fetch('songs/' + this.song._id, {
			method: 'put',
			body: json(this.song)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('songs');
		}).catch(() => {});
	}

	destroy() {
		this.http.fetch('songs/' + this.song._id, {
			method: 'delete'
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('songs');
		}).catch(() => {});
	}
}
