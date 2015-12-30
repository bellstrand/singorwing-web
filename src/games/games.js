import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Menu {
	constructor(router) {
		this.router = router;
	}

	reset() {
		localStorage.red = 0;
		localStorage.blue = 0;
	}
}
