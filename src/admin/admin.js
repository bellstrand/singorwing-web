export class Admin {
	configureRouter(config, router) {
		config.map([
			{ route: '', redirect: 'users' },

			{ route: 'users',				name: 'users',				moduleId: './users/list',			title: 'Users',	 			nav: true },
			{ route: 'users/create',		name: 'user-create',		moduleId: './users/edit',			title: 'Create user' },
			{ route: 'users/:id',			name: 'user-edit',			moduleId: './users/edit',			title: 'Edit user' },

			{ route: 'artists',				name: 'artists',			moduleId: './artists/list',			title: 'Artists',			nav: true },
			{ route: 'artists/create',		name: 'artist-create',		moduleId: './artists/edit',			title: 'Create Artist' },
			{ route: 'artists/:id',			name: 'artist-edit',		moduleId: './artists/edit',			title: 'Edit Artist' },

			{ route: 'songs',				name: 'songs',				moduleId: './songs/list',			title: 'Songs',	 			nav: true },
			{ route: 'songs/create',		name: 'song-create',		moduleId: './songs/edit',			title: 'Create Song' },
			{ route: 'songs/:id',			name: 'song-edit',			moduleId: './songs/edit',			title: 'Edit Song' },

			{ route: 'find-songs',			name: 'find-songs',			moduleId: './find-songs/list',		title: 'Find Songs',	 	nav: true },
			{ route: 'find-songs/create',	name: 'find-song-create',	moduleId: './find-songs/edit',		title: 'Create Find Song' },
			{ route: 'find-songs/:id',		name: 'find-song-edit',		moduleId: './find-songs/edit',		title: 'Edit Find Song' },

			{ route: 'duel-themes',			name: 'duel-themes',		moduleId: './duel-themes/list',		title: 'Duel Themes',		nav: true },
			{ route: 'duel-themes/create',	name: 'duel-theme-create',	moduleId: './duel-themes/edit',		title: 'Create Duel Theme' },
			{ route: 'duel-themes/:id',		name: 'duel-theme-edit',	moduleId: './duel-themes/edit',		title: 'Edit Duel Theme' },

			{ route: 'intros',				name: 'intros',				moduleId: './intros/list',			title: 'Intros',			nav: true },
			{ route: 'intros/create',		name: 'intro-create',		moduleId: './intros/edit',			title: 'Create Intro' },
			{ route: 'intros/:id',			name: 'intro-edit',			moduleId: './intros/edit',			title: 'Edit Intro' }
		]);

		this.router = router;
	}
}
