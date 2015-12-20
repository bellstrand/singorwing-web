import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Auth {
	constructor(http) {
		this.http = http;
	}

	authenticate(username, password) {
		return new Promise((resolve, reject) => {
			this.http.fetch('login', {
				method: 'post',
				body: json({
					username: username,
					password: password
				})
			}).then(response => response.json()).then(user => {
				this.user = user;
				resolve(user);
			}).catch(error => {
				reject(error);
			});
		});
	}

	is(authority) {
		return this.user.authorities.indexOf(authority) !== -1;
	}

	destroy() {
		delete this.user;
	}
}
