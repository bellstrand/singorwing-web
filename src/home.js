import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Auth} from './auth/auth';

@inject(Router, Auth)
export class Home {
	constructor(router, auth) {
		this.router = router;
		this.auth = auth;
	}

	login() {
		this.auth.authenticate(this.username, this.password).then(() => {
			this.router.navigateToRoute('games');
		}).catch(error => {
			//console.log(error);
		});
	}
}
