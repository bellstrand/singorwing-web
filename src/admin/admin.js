export class Admin {
	configureRouter(config, router) {
		config.title = 'Admin';
		config.map([
			{ route: ['users', ''],		name: 'users',			moduleId: './users/list',		title: 'Users',	 	nav: true },
			{ route: 'users/create',	name: 'user-create',	moduleId: './users/edit',		title: 'Create user' },
			{ route: 'users/:id',		name: 'user-edit',		moduleId: './users/edit',		title: 'Edit user' },

			{ route: 'artists',			name: 'artists',		moduleId: './artists/list',		title: 'Artists',	nav: true },
			{ route: 'artists/create',	name: 'artist-create',	moduleId: './artists/edit',		title: 'Create Artist' },
			{ route: 'artists/:id',		name: 'artist-edit',	moduleId: './artists/edit',		title: 'Edit Artist' },

			{ route: 'songs',			name: 'songs',			moduleId: './songs/list',		title: 'Songs',	 	nav: true },
			{ route: 'songs/create',	name: 'song-create',	moduleId: './songs/edit',		title: 'Create song' },
			{ route: 'songs/:id',		name: 'song-edit',		moduleId: './songs/edit',		title: 'Edit song' }
		]);

		this.router = router;
	}
}
