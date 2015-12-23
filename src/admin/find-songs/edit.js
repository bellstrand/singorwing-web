import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class FindSongEdit {
	findSong = {};

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		this.http.fetch('songs').then(response => response.json()).then(songs => {
			this.songs = songs;
		}).catch(() => {});
		if(params.id) {
			this.http.fetch('find-songs/' + params.id).then(response => response.json()).then(findSong => {
				this.findSong = findSong;
			}).catch(() => {});
		}
	}

	create() {
		this.http.fetch('find-songs', {
			method: 'post',
			body: json(this.findSong)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('find-songs');
		}).catch(() => {});
	}

	update() {
		this.http.fetch('find-songs/' + this.findSong._id, {
			method: 'put',
			body: json(this.findSong)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('find-songs');
		}).catch(() => {});
	}

	destroy() {
		this.http.fetch('find-songs/' + this.findSong._id, {
			method: 'delete'
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('find-songs');
		}).catch(() => {});
	}
}
