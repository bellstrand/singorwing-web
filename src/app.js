import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Events} from './events';
import {Base64Utils} from './utils/base64-utils';

@inject(HttpClient, Events, Base64Utils)
export class App {
	constructor(http, events, base64Utils) {
		http.configure(config => {
			config.withBaseUrl('/api/');
			config.withDefaults({
				credentials: 'include',
				headers: {
					'Accept': 'application/json',
					'X-Requested-With': 'Fetch'
				}
			});
			config.rejectErrorResponses();
			config.withInterceptor({
				responseError(response) {
					if(response.status === 401) {
						router.navigateToRoute('home');
					}
					throw response;
				}
			});
		});
	}

	configureRouter(config, router) {
		config.title = 'Sing or Wing';
		config.options.pushState = true;
		config.map([
			{ route: '',					name: 'home',				moduleId: 'home' },
			{ route: 'games',				name: 'games',				moduleId: 'games/games' },
			{ route: 'find-songs',			name: 'find-songs',			moduleId: 'games/find-songs',			nav: true,	title: 'Find the Song' },
			{ route: 'guess-artist',		name: 'guess-artist',		moduleId: 'games/guess-artist',			nav: true,	title: 'Guess the Artist' },
			{ route: 'intros',				name: 'intros',				moduleId: 'games/intros',				nav: true,	title: 'Intros' },
			{ route: 'duel',				name: 'duel',				moduleId: 'games/duel',					nav: true,	title: 'Duel' },
			{ route: 'title-distortions',	name: 'title-distortions',	moduleId: 'games/title-distortions',	nav: true,	title: 'Title Distortion' },
			//{ route: 'title-scramble',	name: 'title-scramble',		moduleId: 'games/title-scramble',		nav: true,	title: 'Title Scramble' },
			//{ route: 'picture-question',	name: 'picture-question',	moduleId: 'games/picture-question',		nav: true,	title: 'Picture Question' },
			//{ route: 'picture-chain',		name: 'picture-chain',		moduleId: 'games/picture-chain',		nav: true,	title: 'Picture Chain' },
			{ route: 'admin',				name: 'admin',				moduleId: 'admin/admin',							title: 'Admin' }
		]);
		config.mapUnknownRoutes(() => {
			router.navigateToRoute('home');
		});

		this.router = router;
	}
}
