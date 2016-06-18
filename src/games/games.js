import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject(Router, HttpClient)
export class Menu {
	constructor(router, http) {
		this.router = router;
		this.http = http;
	}

	reset() {
		localStorage.red = 0;
		localStorage.blue = 0;
		this.http.fetch('start').then(response => response.json()).then(() => {}).catch(() => {});
	}
}
