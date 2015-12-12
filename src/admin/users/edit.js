import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class UserEdit {
	authorities = [
		'moderator',
		'sysadmin'
	];

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		this.http.fetch('users/' + params.id).then(response => response.json()).then(user => {
			this.user = user;
		}, () => {});
	}

	create() {
		this.http.fetch('users', {
			method: 'post',
			body: json(this.user)
		});
	}

	update() {
		this.http.fetch('users', {
			method: 'put',
			body: json(this.user)
		});
	}
}
