import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class SongEdit {
	song = {};
	artists = [];
	genres = ['anime', 'blues', 'comedy', 'country', 'dance', 'disney', 'folk', 'hard Rock', 'hip-hop/rap', 'metal', 'pop', 'punk', 'reggae', 'rock', 'world'];

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		this.http.fetch('artists').then(response => response.json()).then(artists => {
			this.artists = artists;
		}, () => {});
		if(params.id) {
			this.http.fetch('songs/' + params.id).then(response => response.json()).then(song => {
				this.song = song;
			}, () => {});
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
		});
	}

	update() {
		this.http.fetch('songs/' + this.song._id, {
			method: 'put',
			body: json(this.song)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('songs');
		});
	}

	destroy() {
		this.http.fetch('songs/' + this.song._id, {
			method: 'delete'
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('songs');
		});
	}
}
