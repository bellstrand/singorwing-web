import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class IntroEdit {
	intro = {};

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		this.http.fetch('songs').then(response => response.json()).then(songs => {
			this.songs = songs;
		}).catch(() => {});
		if(params.id) {
			this.http.fetch('intros/' + params.id).then(response => response.json()).then(intro => {
				this.intro = intro;
			}).catch(() => {});
		}
	}

	create() {
		this.http.fetch('intros', {
			method: 'post',
			body: json(this.intro)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('intros');
		}).catch(() => {});
	}

	update() {
		this.http.fetch('intros/' + this.intro._id, {
			method: 'put',
			body: json(this.intro)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('intros');
		}).catch(() => {});
	}

	destroy() {
		this.http.fetch('intros/' + this.intro._id, {
			method: 'delete'
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('intros');
		}).catch(() => {});
	}
}
