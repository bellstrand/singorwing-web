import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Base64Utils} from './utils/base64-utils';

@inject(HttpClient, Base64Utils)
export class App {
	constructor(http, base64Utils) {
		http.configure(config => {
			config.withBaseUrl('http://' + location.hostname + ':' + location.port + '/api/');
			config.withDefaults({
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'X-Requested-With': 'Fetch'
				}
			});
		});
	}

	configureRouter(config, router) {
		config.title = 'Sing it or Wing it';
		config.options.pushState = true;
		config.map([
			{ route: '',					name: 'home',				moduleId: 'home' },
			{ route: 'games',				name: 'games',				moduleId: 'games/games' },
			{ route: 'find-song',			name: 'find-song',			moduleId: 'games/find-song',		nav: true,	title: 'Find the Song' },
			{ route: 'title-scramble',		name: 'title-scramble',		moduleId: 'games/title-scramble',	nav: true,	title: 'Title Scramble' },
			{ route: 'picture-question',	name: 'picture-question',	moduleId: 'games/picture-question',	nav: true,	title: 'Picture Question' },
			{ route: 'duel',				name: 'duel',				moduleId: 'games/duel',				nav: true,	title: 'Duel' },
			{ route: 'title-distortion',	name: 'title-distortion',	moduleId: 'games/title-distortion',	nav: true,	title: 'Title Distortion' },
			{ route: 'picture-chain',		name: 'picture-chain',		moduleId: 'games/picture-chain',	nav: true,	title: 'Picture Chain' },
			{ route: 'guess-artist',		name: 'guess-artist',		moduleId: 'games/guess-artist',		nav: true,	title: 'Guess the Artist' },
			{ route: 'admin',				name: 'admin',				moduleId: 'admin/admin',			title: 'Admin' }
		]);

		this.router = router;
	}
}
