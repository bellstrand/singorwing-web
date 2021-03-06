import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import {Router} from 'aurelia-router';

@inject(HttpClient, Router)
export class SongEdit {
	song = {
		distortions: [],
		findSongs: []
	};
	artists = [];
	genres = ['anime', 'blues/jazz', 'comedy', 'country', 'dance', 'disney', 'folk', 'hard rock', 'hip-hop/rap', 'metal', 'pop', 'punk', 'reggae', 'rock', 'world'];
	difficulties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	constructor(http, router) {
		this.http = http;
		this.router = router;
	}

	activate(params) {
		this.http.fetch('artists').then(response => response.json()).then(artists => {
			this.artists = artists;
		}).catch(() => {});
		if(params.id) {
			this.http.fetch('songs/' + params.id).then(response => response.json()).then(song => {
				this.song = song;
				this.intro = this.song.intro;
				this.song.distortions.forEach(distortion => {
					distortion.difficulty = distortion.difficulty.toString();
				});
				this.song.findSongs.forEach(findSong => {
					findSong.difficulty = findSong.difficulty.toString();
				});
				if(this.intro && this.intro.difficulty) {
					this.intro.difficulty = this.intro.difficulty.toString();
				}
			}).catch(() => {});
		}
	}

	setGenre(artistId) {
		this.artists.map(artist => {
			if(artist._id === artistId) {
				this.song.genre = artist.genre;
			}
		});
	}

	addDistortion() {
		this.song.distortions.push({});
	}

	removeDistortion(distortion) {
		this.song.distortions.splice(this.song.distortions.indexOf(distortion), 1);
	}

	addFindSong() {
		this.song.findSongs.push({});
	}

	removeFindSong(findSong) {
		this.song.findSongs.splice(this.song.findSongs.indexOf(findSong), 1);
	}

	addIntro() {
		this.intro = {};
		this.song.intro = this.intro;
	}

	removeIntro() {
		this.song.intro = null;
	}

	create() {
		this.http.fetch('songs', {
			method: 'post',
			body: json(this.song)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('songs');
		}).catch(() => {});
	}

	update() {
		this.http.fetch('songs/' + this.song._id, {
			method: 'put',
			body: json(this.song)
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('songs');
		}).catch(() => {});
	}

	destroy() {
		this.http.fetch('songs/' + this.song._id, {
			method: 'delete'
		}).then(response => response.json()).then(() => {
			this.router.navigateToRoute('songs');
		}).catch(() => {});
	}
}
