import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class UserList {
	constructor(http) {
		http.fetch('users').then(response => response.json()).then(users => {
			this.users = users;
		}, () => {});
	}
}
