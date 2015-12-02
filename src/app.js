export class App {
	configureRouter(config, router) {
		config.title = 'Sing it or Wing it';
		config.options.pushState = true;
		config.map([
			{ route: 'welcome',				name: 'welcome',			moduleId: 'welcome/welcome' },
			{ route: '',					name: 'menu',				moduleId: 'games/menu' },
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
