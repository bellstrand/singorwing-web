import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class UserList {
	constructor(http, router) {
		this.router = router;
		http.fetch('users').then(response => response.json()).then(users => {
			this.users = users;
			this.filter(this.search);
		}).catch(() => {});
	}

	filter(search) {
		if(search) {
			let found;
			search = search.toLowerCase();
			this.filteredUsers = this.users.filter(user => {
				found = false;
				Object.keys(user).forEach(prop => {
					if(typeof user[prop] === 'string' && user[prop].toLowerCase().indexOf(search) !== -1) {
						found = true;
					}
				});
				return found;
			});
		} else {
			this.filteredUsers = this.users;
		}
	}
}
