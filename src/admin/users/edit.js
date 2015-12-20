import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class UserEdit {
	user = {};
	authorities = [
		'admin',
		'sysadmin'
	];

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		if(params.id) {
			this.http.fetch('users/' + params.id).then(response => response.json()).then(user => {
				this.user = user;
			}, () => {});
		}
	}

	create() {
		this.http.fetch('users', {
			method: 'post',
			body: json(this.user)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('users');
		});
	}

	update() {
		this.http.fetch('users/' + this.user._id, {
			method: 'put',
			body: json(this.user)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('users');
		});
	}

	destroy() {
		this.http.fetch('users/' + this.user._id, {
			method: 'delete'
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('users');
		});
	}
}
