import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class DuelThemeEdit {
	duelTheme = {};

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		this.http.fetch('duel-themes').then(response => response.json()).then(songs => {
			this.songs = songs;
		}).catch(() => {});
		if(params.id) {
			this.http.fetch('duel-themes/' + params.id).then(response => response.json()).then(duelTheme => {
				this.duelTheme = duelTheme;
			}).catch(() => {});
		}
	}

	create() {
		this.http.fetch('duel-themes', {
			method: 'post',
			body: json(this.duelTheme)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('duel-themes');
		}).catch(() => {});
	}

	update() {
		this.http.fetch('duel-themes/' + this.duelTheme._id, {
			method: 'put',
			body: json(this.duelTheme)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('duel-themes');
		}).catch(() => {});
	}

	destroy() {
		this.http.fetch('duel-themes/' + this.duelTheme._id, {
			method: 'delete'
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('duel-themes');
		}).catch(() => {});
	}
}
