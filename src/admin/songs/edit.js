import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class SongEdit {
	song = {};
	artists = [];

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

	create() {
		this.http.fetch('songs', {
			method: 'post',
			body: json(this.song)
		}).then(() => {
			this.router.navigateToRoute('songs');
		});
	}

	update() {
		this.http.fetch('songs/' + this.song._id, {
			method: 'put',
			body: json(this.song)
		}).then(() => {
			this.router.navigateToRoute('songs');
		});
	}

	destroy() {
		this.http.fetch('songs/' + this.song._id, {
			method: 'delete'
		}).then(() => {
			this.router.navigateToRoute('songs');
		});
	}
}
