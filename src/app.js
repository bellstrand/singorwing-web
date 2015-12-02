export class App {
	configureRouter(config, router) {
		config.title = 'Sing it or Wing it';
		config.map([
			{ route: '',			name: 'menu',		moduleId: 'games/menu' },
			{ route: 'welcome',		name: 'welcome',	moduleId: 'welcome/welcome' },
			{ route: 'admin',		name: 'admin',		moduleId: 'admin/admin',		title: 'Admin' }
		]);

		this.router = router;
	}
}
