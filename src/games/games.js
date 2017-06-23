import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';

@inject(Router, HttpClient)
export class Menu {
	constructor(router, http) {
		this.router = router;
		this.http = http;

		this.websocket = new WebSocket('ws://localhost:8000/api/websocket');
		this.websocket.onmessage = message => {
			console.log(message.data);
		};
		this.websocket.onclose = error => {
			console.log(error);
		};
		this.websocket.onerror = error => {
			console.log(error);
		};
	}

	reset() {
		localStorage.red = 0;
		localStorage.blue = 0;
		this.http.fetch('start').then(response => response.json()).then(() => {}).catch(() => {});
	}

	test() {
		this.http.fetch('reset').then(response => response.json()).then(() => {}).catch(() => {});
	}
}
