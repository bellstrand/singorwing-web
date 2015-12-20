import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class ArtistEdit {
	artist = {
		language: 'swedish',
		genre: '',
		decade: ''
	};
	genres = ['anime', 'blues', 'comedy', 'country', 'dance', 'disney', 'folk', 'hard Rock', 'hip-hop/rap', 'metal', 'pop', 'punk', 'reggae', 'rock', 'world'];
	languages = ['english', 'swedish'];
	decades = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		if(params.id) {
			this.http.fetch('artists/' + params.id).then(response => response.json()).then(artist => {
				artist.decade = artist.decade.toString();
				this.artist = artist;
			}).catch(() => {});
		}
	}

	convertImage() {
		return new Promise(resolve => {
			if(typeof this.artist.image !== 'object' || this.artist.image.length === 0) {
				delete this.artist.image;
				resolve();
			} else {
				this.artist.image[0].convertToBase64().then(data => {
					delete this.artist.image;
					this.artist.base64Image = data;
					resolve();
				});
			}
		});
	}

	create() {
		this.convertImage().then(() => {
			this.http.fetch('artists', {
				method: 'post',
				body: json(this.artist)
			}).then(data => {
				this.router.navigateToRoute('artists');
			}).catch(() => {});
		});
	}

	update() {
		this.convertImage().then(() => {
			this.http.fetch('artists/' + this.artist._id, {
				method: 'put',
				body: json(this.artist)
			}).then(() => {
				this.router.navigateToRoute('artists');
			}).catch(() => {});
		});
	}

	destroy() {
		this.http.fetch('artists/' + this.artist._id, {
			method: 'delete'
		}).then(() => {
			this.router.navigateToRoute('artists');
		}).catch(() => {});
	}
}
