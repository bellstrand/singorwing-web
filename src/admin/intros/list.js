import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class IntroList {
	constructor(http, router) {
		this.router = router;
		http.fetch('intros').then(response => response.json()).then(intros => {
			this.intros = intros;
			this.filter(this.search);
		}).catch(() => {});
	}

	filter(search) {
		if(search) {
			search = search.toLowerCase();
			this.filteredIntros = this.intros.filter(intro => {
				return intro.theme.toLowerCase().indexOf(search) !== -1 ? true : false;
			});
		} else {
			this.filteredIntros = this.intros;
		}
	}
}
