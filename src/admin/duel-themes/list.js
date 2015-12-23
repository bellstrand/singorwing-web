import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class DuelThemeList {
	constructor(http, router) {
		this.router = router;
		http.fetch('duel-themes').then(response => response.json()).then(duelThemes => {
			this.duelThemes = duelThemes;
			this.filter(this.search);
		}).catch(() => {});
	}

	filter(search) {
		if(search) {
			search = search.toLowerCase();
			this.filteredDuelThemes = this.duelThemes.filter(duelTheme => {
				return duelTheme.theme.toLowerCase().indexOf(search) !== -1 ? true : false;
			});
		} else {
			this.filteredDuelThemes = this.duelThemes;
		}
	}
}
