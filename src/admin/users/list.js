import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class UserList {
	constructor(http, router) {
		this.router = router;
		http.fetch('users').then(response => response.json()).then(users => {
			this.users = users;
		}, () => {});
	}
}
