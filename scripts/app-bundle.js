define('app',['exports', 'aurelia-framework', 'aurelia-fetch-client', './events', './utils/base64-utils'], function (exports, _aureliaFramework, _aureliaFetchClient, _events, _base64Utils) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.App = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _events.Events, _base64Utils.Base64Utils), _dec(_class = function () {
		function App(http, events, base64Utils) {
			_classCallCheck(this, App);

			http.configure(function (config) {
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
					responseError: function responseError(response) {
						if (response.status === 401) {
							router.navigateToRoute('home');
						}
						throw response;
					}
				});
			});
		}

		App.prototype.configureRouter = function configureRouter(config, router) {
			config.title = 'Sing or Wing';
			config.options.pushState = true;
			config.map([{ route: '', name: 'home', moduleId: 'home' }, { route: 'games', name: 'games', moduleId: 'games/games' }, { route: 'find-songs', name: 'find-songs', moduleId: 'games/find-songs', nav: true, title: 'Find the Song' }, { route: 'guess-artist', name: 'guess-artist', moduleId: 'games/guess-artist', nav: true, title: 'Guess the Artist' }, { route: 'intros', name: 'intros', moduleId: 'games/intros', nav: true, title: 'Intros' }, { route: 'duel', name: 'duel', moduleId: 'games/duel', nav: true, title: 'Duel' }, { route: 'title-distortions', name: 'title-distortions', moduleId: 'games/title-distortions', nav: true, title: 'Title Distortion' }, { route: 'admin', name: 'admin', moduleId: 'admin/admin', title: 'Admin' }]);
			config.mapUnknownRoutes(function () {
				router.navigateToRoute('home');
			});

			this.router = router;
		};

		return App;
	}()) || _class);
});
define('environment',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		debug: true,
		testing: true
	};
});
define('events',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Events = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Events = exports.Events = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaRouter.Router), _dec(_class = function () {
		function Events(eventAggregator, router) {
			var _this = this;

			_classCallCheck(this, Events);

			this.eventAggregator = eventAggregator;
			this.router = router;
			document.addEventListener('keydown', function (event) {
				return _this.keydown(event);
			});
		}

		Events.prototype.keydown = function keydown(event) {
			switch (event.keyCode) {
				case 70:
					this.toggleFullscreen(event);
					break;
				default:
					this.eventAggregator.publish('keydown', event);
					break;
			}
		};

		Events.prototype.toggleFullscreen = function toggleFullscreen(event) {
			if (['input', 'textarea'].indexOf(event.target.localName) === -1) {
				if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
					var elem = document.querySelector('body');
					if (elem.requestFullscreen) {
						elem.requestFullscreen();
					} else if (elem.webkitRequestFullscreen) {
						elem.webkitRequestFullscreen();
					} else if (elem.mozRequestFullScreen) {
						elem.mozRequestFullScreen();
					} else if (elem.msRequestFullscreen) {
						elem.msRequestFullscreen();
					}
				} else {
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					}
				}
			}
		};

		return Events;
	}()) || _class);
});
define('home',['exports', 'aurelia-framework', 'aurelia-router', './auth/auth'], function (exports, _aureliaFramework, _aureliaRouter, _auth) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Home = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _auth.Auth), _dec(_class = function () {
		function Home(router, auth) {
			_classCallCheck(this, Home);

			this.router = router;
			this.auth = auth;
		}

		Home.prototype.login = function login() {
			var _this = this;

			this.auth.authenticate(this.username, this.password).then(function () {
				_this.router.navigateToRoute('games');
			}).catch(function (error) {});
		};

		return Home;
	}()) || _class);
});
define('main',['exports', './environment', 'aurelia-framework', 'aurelia-logging-console'], function (exports, _environment, _aureliaFramework, _aureliaLoggingConsole) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.configure = configure;

	var _environment2 = _interopRequireDefault(_environment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	Promise.config({
		longStackTraces: false,
		warnings: false
	});

	if (_environment2.default.debug) {
		_aureliaFramework.LogManager.addAppender(new _aureliaLoggingConsole.ConsoleAppender());
		_aureliaFramework.LogManager.setLevel(_aureliaFramework.LogManager.logLevel.debug);
	}

	function configure(aurelia) {
		aurelia.use.standardConfiguration().feature('resources');

		if (_environment2.default.testing) {
			aurelia.use.plugin('aurelia-testing');
		}

		aurelia.start().then(function () {
			return aurelia.setRoot();
		});
	}
});
define('admin/admin',['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var Admin = exports.Admin = function () {
		function Admin() {
			_classCallCheck(this, Admin);
		}

		Admin.prototype.configureRouter = function configureRouter(config, router) {
			config.map([{ route: '', redirect: 'users' }, { route: 'users', name: 'users', moduleId: './users/list', title: 'Users', nav: true }, { route: 'users/create', name: 'user-create', moduleId: './users/edit', title: 'Create user' }, { route: 'users/:id', name: 'user-edit', moduleId: './users/edit', title: 'Edit user' }, { route: 'artists', name: 'artists', moduleId: './artists/list', title: 'Artists', nav: true }, { route: 'artists/create', name: 'artist-create', moduleId: './artists/edit', title: 'Create Artist' }, { route: 'artists/:id', name: 'artist-edit', moduleId: './artists/edit', title: 'Edit Artist' }, { route: 'songs', name: 'songs', moduleId: './songs/list', title: 'Songs', nav: true }, { route: 'songs/create', name: 'song-create', moduleId: './songs/edit', title: 'Create Song' }, { route: 'songs/:id', name: 'song-edit', moduleId: './songs/edit', title: 'Edit Song' }, { route: 'duel-themes', name: 'duel-themes', moduleId: './duel-themes/list', title: 'Duel Themes', nav: true }, { route: 'duel-themes/create', name: 'duel-theme-create', moduleId: './duel-themes/edit', title: 'Create Duel Theme' }, { route: 'duel-themes/:id', name: 'duel-theme-edit', moduleId: './duel-themes/edit', title: 'Edit Duel Theme' }]);

			this.router = router;
		};

		return Admin;
	}();
});
define('auth/auth',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Auth = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Auth = exports.Auth = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
		function Auth(http) {
			_classCallCheck(this, Auth);

			this.http = http;
		}

		Auth.prototype.authenticate = function authenticate(username, password) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				_this.http.fetch('login', {
					method: 'post',
					body: (0, _aureliaFetchClient.json)({
						username: username,
						password: password
					})
				}).then(function (response) {
					return response.json();
				}).then(function (user) {
					_this.user = user;
					resolve(user);
				}).catch(function (error) {
					reject(error);
				});
			});
		};

		Auth.prototype.is = function is(authority) {
			return this.user.authorities.indexOf(authority) !== -1;
		};

		Auth.prototype.destroy = function destroy() {
			delete this.user;
		};

		return Auth;
	}()) || _class);
});
define('games/duel',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', 'aurelia-event-aggregator', '../utils/shuffle'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter, _aureliaEventAggregator, _shuffle) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Duel = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Duel = exports.Duel = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
		function Duel(http, router, eventAggregator) {
			var _this = this;

			_classCallCheck(this, Duel);

			this.router = router;
			this.eventAggregator = eventAggregator;
			http.fetch('duel-themes').then(function (response) {
				return response.json();
			}).then(function (duelThemes) {
				_this.init(duelThemes);
			}).catch(function () {});
		}

		Duel.prototype.init = function init(duelThemes) {
			var _this2 = this;

			this.index = 0;
			this.duelThemes = (0, _shuffle.shuffle)(duelThemes);
			this.duelTheme = this.duelThemes[this.index];
			this.unsubscribe = this.eventAggregator.subscribe('keydown', function (event) {
				return _this2.keydown(event.keyCode);
			});
		};

		Duel.prototype.keydown = function keydown(keyCode) {
			switch (keyCode) {
				case 37:
					this.previous();break;
				case 39:
					this.next();break;
				case 81:
					this.quit();break;
			}
		};

		Duel.prototype.next = function next() {
			this.index = this.index !== this.duelThemes.length - 1 ? this.index + 1 : 0;
			this.duelTheme = this.duelThemes[this.index];
		};

		Duel.prototype.previous = function previous() {
			this.index = this.index !== 0 ? this.index - 1 : this.duelThemes.length - 1;
			this.duelTheme = this.duelThemes[this.index];
		};

		Duel.prototype.quit = function quit() {
			this.router.navigateToRoute('games');
		};

		return Duel;
	}()) || _class);
});
define('games/find-songs',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter, _aureliaEventAggregator) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.FindSong = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var FindSong = exports.FindSong = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
		function FindSong(http, router, eventAggregator) {
			var _this = this;

			_classCallCheck(this, FindSong);

			this.router = router;
			this.eventAggregator = eventAggregator;
			this.logger = _aureliaFramework.LogManager.getLogger('FindSong');
			http.fetch('songs/find-songs').then(function (response) {
				return response.json();
			}).then(function (songs) {
				_this.init(songs);
			}).catch(function () {});
		}

		FindSong.prototype.init = function init(songs) {
			var _this2 = this;

			this.index = 0;
			this.songs = songs;
			this.findSong = this.getFindSong();
			this.generateRivets();
			this.logInfo();
			this.unsubscribe = this.eventAggregator.subscribe('keydown', function (event) {
				return _this2.keydown(event.keyCode);
			});
		};

		FindSong.prototype.detached = function detached() {
			this.unsubscribe.dispose();
		};

		FindSong.prototype.keydown = function keydown(keyCode) {
			switch (keyCode) {
				case 37:
					this.previous();break;
				case 39:
					this.next();break;
				case 81:
					this.quit();break;
			}
		};

		FindSong.prototype.show = function show(index) {
			document.querySelectorAll('.find-songs .index')[index].style.visibility = 'hidden';
			document.querySelectorAll('.find-songs .word')[index].style.visibility = 'visible';
			if (this.rivets.indexOf(index) !== -1) {
				document.querySelectorAll('.find-songs .phrase div')[index].style.background = '#a00';
			}
		};

		FindSong.prototype.getFindSong = function getFindSong() {
			return this.songs[this.index].findSongs[Math.floor(Math.random() * this.songs[this.index].findSongs.length)];
		};

		FindSong.prototype.generateRivets = function generateRivets() {
			this.rivets = [];
			var phraseLength = this.findSong.phrase.split(' ').length;
			if (phraseLength > 2) {
				var numberOfRivets = phraseLength < 8 ? 2 : 3;
				while (this.rivets.length < numberOfRivets) {
					var randomNumber = Math.floor(Math.random() * phraseLength);
					if (this.rivets.indexOf(randomNumber) === -1) {
						this.rivets.push(randomNumber);
					}
				}
			}
		};

		FindSong.prototype.next = function next() {
			var _this3 = this;

			this.index = this.index !== this.songs.length - 1 ? this.index + 1 : 0;
			this.findSong = null;
			setTimeout(function () {
				_this3.findSong = _this3.getFindSong();
				_this3.generateRivets();
				_this3.logInfo();
			}, 1);
		};

		FindSong.prototype.previous = function previous() {
			var _this4 = this;

			this.index = this.index !== 0 ? this.index - 1 : this.songs.length - 1;
			this.findSong = null;
			setTimeout(function () {
				_this4.findSong = _this4.getFindSong();
				_this4.generateRivets();
				_this4.logInfo();
			}, 1);
		};

		FindSong.prototype.logInfo = function logInfo() {
			this.logger.info('Artist: ' + this.songs[this.index].artist.name);
			this.logger.info('Song: ' + this.songs[this.index].name);
			this.logger.info('Phrase: ' + this.findSong.phrase);
			this.logger.info('');
		};

		FindSong.prototype.quit = function quit() {
			this.router.navigateToRoute('games');
		};

		return FindSong;
	}()) || _class);
});
define('games/games',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaFetchClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Menu = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Menu = exports.Menu = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaFetchClient.HttpClient), _dec(_class = function () {
		function Menu(router, http) {
			_classCallCheck(this, Menu);

			this.router = router;
			this.http = http;

			this.websocket = new WebSocket('ws://localhost:8000/api/websocket');
			this.websocket.onmessage = function (message) {
				console.log(message.data);
			};
			this.websocket.onclose = function (error) {
				console.log(error);
			};
			this.websocket.onerror = function (error) {
				console.log(error);
			};
		}

		Menu.prototype.reset = function reset() {
			localStorage.red = 0;
			localStorage.blue = 0;
			this.http.fetch('start').then(function (response) {
				return response.json();
			}).then(function () {}).catch(function () {});
		};

		Menu.prototype.test = function test() {
			this.http.fetch('reset').then(function (response) {
				return response.json();
			}).then(function () {}).catch(function () {});
		};

		return Menu;
	}()) || _class);
});
define('games/guess-artist',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', 'aurelia-event-aggregator', '../utils/shuffle'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter, _aureliaEventAggregator, _shuffle) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.GuessArtist = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var GuessArtist = exports.GuessArtist = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
		function GuessArtist(http, router, eventAggregator) {
			var _this = this;

			_classCallCheck(this, GuessArtist);

			this.router = router;
			this.eventAggregator = eventAggregator;
			http.fetch('artists?maxDifficulty=9').then(function (response) {
				return response.json();
			}).then(function (artists) {
				_this.init(artists);
			}).catch(function () {});
		}

		GuessArtist.prototype.init = function init(artists) {
			var _this2 = this;

			this.index = 0;
			this.artists = (0, _shuffle.shuffle)(artists);
			this.artist = this.artists[this.index];
			this.unsubscribe = this.eventAggregator.subscribe('keydown', function (event) {
				return _this2.keydown(event.keyCode);
			});
		};

		GuessArtist.prototype.detached = function detached() {
			this.unsubscribe.dispose();
		};

		GuessArtist.prototype.keydown = function keydown(keyCode) {
			switch (keyCode) {
				case 37:
					this.previous();break;
				case 39:
					this.next();break;
				case 81:
					this.quit();break;
			}
		};

		GuessArtist.prototype.next = function next() {
			this.index = this.index !== this.artists.length - 1 ? this.index + 1 : 0;
			this.artist = this.artists[this.index];
		};

		GuessArtist.prototype.previous = function previous() {
			this.index = this.index !== 0 ? this.index - 1 : this.artists.length - 1;
			this.artist = this.artists[this.index];
		};

		GuessArtist.prototype.quit = function quit() {
			this.router.navigateToRoute('games');
		};

		return GuessArtist;
	}()) || _class);
});
define('games/intros',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', 'aurelia-event-aggregator', '../utils/shuffle'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter, _aureliaEventAggregator, _shuffle) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Intros = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Intros = exports.Intros = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
		function Intros(http, router, eventAggregator) {
			_classCallCheck(this, Intros);

			this.title = '';

			this.http = http;
			this.router = router;
			this.eventAggregator = eventAggregator;
			this.logger = _aureliaFramework.LogManager.getLogger('Intros');
		}

		Intros.prototype.attached = function attached() {
			var _this = this;

			this.http.fetch('songs/intros').then(function (response) {
				return response.json();
			}).then(function (songs) {
				_this.init(songs);
			}).catch(function () {});
		};

		Intros.prototype.init = function init(songs) {
			var _this2 = this;

			this.index = 0;
			this.songs = (0, _shuffle.shuffle)(songs);
			this.song = this.songs[this.index];
			this.player = new YT.Player('player', {
				events: {
					onReady: function onReady() {
						_this2.player.setVolume(100);
						_this2.loadAndPlayVideo();
						_this2.unsubscribe = _this2.eventAggregator.subscribe('keydown', function (event) {
							return _this2.keydown(event.keyCode);
						});
					}
				}
			});
		};

		Intros.prototype.loadAndPlayVideo = function loadAndPlayVideo() {
			var _this3 = this;

			this.title = '';
			this.player.loadVideoById({
				videoId: this.song.intro.videoId,
				startSeconds: this.song.intro.start || 0,
				endSeconds: 5,
				suggestedQuality: 'default'
			});
			clearInterval(this.pauseInterval);
			this.pauseInterval = setInterval(function () {
				if (_this3.player.getCurrentTime() > _this3.song.intro.end) {
					_this3.player.pauseVideo();
					clearInterval(_this3.pauseInterval);
				}
			}, 100);
			this.logger.info('Artist: ' + this.song.artist.name);
			this.logger.info('Song: ' + this.song.name);
			this.logger.info('Start: ' + this.song.intro.start + ', End: ' + this.song.intro.end + ', Chorus: ' + this.song.intro.chorus);
			this.logger.info('');
		};

		Intros.prototype.playPause = function playPause() {
			if (this.player.getPlayerState() === 1) {
				this.player.pauseVideo();
			} else {
				this.player.playVideo();
			}
		};

		Intros.prototype.playChorus = function playChorus() {
			clearInterval(this.pauseInterval);
			this.title = this.song.artist.name + ' - ' + this.song.name;
			this.player.seekTo(this.song.intro.chorus || 0);
			this.player.playVideo();
		};

		Intros.prototype.detached = function detached() {
			clearInterval(this.pauseInterval);
			this.unsubscribe.dispose();
		};

		Intros.prototype.keydown = function keydown(keyCode) {
			switch (keyCode) {
				case 13:
					this.playChorus();break;
				case 32:
					this.playPause();break;
				case 37:
					this.previous();break;
				case 39:
					this.next();break;
				case 81:
					this.quit();break;
			}
		};

		Intros.prototype.next = function next() {
			this.index = this.index !== this.songs.length - 1 ? this.index + 1 : 0;
			this.song = this.songs[this.index];
			this.loadAndPlayVideo();
		};

		Intros.prototype.previous = function previous() {
			this.index = this.index !== 0 ? this.index - 1 : this.songs.length - 1;
			this.song = this.songs[this.index];
			this.loadAndPlayVideo();
		};

		Intros.prototype.quit = function quit() {
			this.router.navigateToRoute('games');
		};

		return Intros;
	}()) || _class);
});
define('games/title-distortions',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter, _aureliaEventAggregator) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TitleDistortions = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var TitleDistortions = exports.TitleDistortions = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
		function TitleDistortions(http, router, eventAggregator) {
			var _this = this;

			_classCallCheck(this, TitleDistortions);

			this.router = router;
			this.eventAggregator = eventAggregator;
			this.logger = _aureliaFramework.LogManager.getLogger('TitleDistortions');
			http.fetch('songs/distortions').then(function (response) {
				return response.json();
			}).then(function (songs) {
				_this.init(songs);
			}).catch(function () {});
		}

		TitleDistortions.prototype.init = function init(songs) {
			var _this2 = this;

			this.index = 0;
			this.songs = songs;
			this.distortion = this.getDistortion();
			this.logInfo();
			this.unsubscribe = this.eventAggregator.subscribe('keydown', function (event) {
				return _this2.keydown(event.keyCode);
			});
		};

		TitleDistortions.prototype.detached = function detached() {
			this.unsubscribe.dispose();
		};

		TitleDistortions.prototype.keydown = function keydown(keyCode) {
			switch (keyCode) {
				case 37:
					this.previous();break;
				case 39:
					this.next();break;
				case 81:
					this.quit();break;
			}
		};

		TitleDistortions.prototype.getDistortion = function getDistortion() {
			return this.songs[this.index].distortions[Math.floor(Math.random() * this.songs[this.index].distortions.length)];
		};

		TitleDistortions.prototype.next = function next() {
			this.index = this.index !== this.songs.length - 1 ? this.index + 1 : 0;
			this.distortion = this.getDistortion();
			this.logInfo();
		};

		TitleDistortions.prototype.previous = function previous() {
			this.index = this.index !== 0 ? this.index - 1 : this.songs.length - 1;
			this.distortion = this.getDistortion();
			this.logInfo();
		};

		TitleDistortions.prototype.logInfo = function logInfo() {
			this.logger.info('Artist: ' + this.songs[this.index].artist.name);
			this.logger.info('Song: ' + this.songs[this.index].name);
			this.logger.info('Distortion: ' + this.distortion.distortion);
			this.logger.info('');
		};

		TitleDistortions.prototype.quit = function quit() {
			this.router.navigateToRoute('games');
		};

		return TitleDistortions;
	}()) || _class);
});
define('resources/index',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.configure = configure;
	function configure(config) {
		config.globalResources([]);
	}
});
define('score/score',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Score = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Score = exports.Score = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
		function Score(eventAggregator) {
			var _this = this;

			_classCallCheck(this, Score);

			this.red = localStorage.red || 0;
			this.blue = localStorage.blue || 0;
			this.unsubscribe = eventAggregator.subscribe('keydown', function (event) {
				return _this.keydown(event);
			});
		}

		Score.prototype.keydown = function keydown(event) {
			if (!event.metaKey && !event.ctrlKey && !event.alt && !event.shift) {
				if (event.keyCode === 82) {
					this.addRedScore();
				} else if (event.keyCode === 66) {
					this.addBlueScore();
				}
			}
		};

		Score.prototype.addRedScore = function addRedScore() {
			localStorage.red = ++this.red;
		};

		Score.prototype.addBlueScore = function addBlueScore() {
			localStorage.blue = ++this.blue;
		};

		Score.prototype.detached = function detached() {
			this.unsubscribe.dispose();
		};

		return Score;
	}()) || _class);
});
define('utils/base64-utils',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var Base64Utils = exports.Base64Utils = function Base64Utils() {
		_classCallCheck(this, Base64Utils);

		File.prototype.convertToBase64 = function () {
			var _this = this;

			return new Promise(function (resolve, reject) {
				var reader = new FileReader();
				reader.onload = function (event) {
					resolve(event.target.result);
				};
				reader.readAsDataURL(_this);
			});
		};
	};
});
define('utils/shuffle',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.shuffle = shuffle;
	function shuffle(array) {
		var i = array.length;
		var temp = void 0;
		var index = void 0;
		while (i > 0) {
			index = Math.floor(Math.random() * i);
			i--;
			temp = array[i];
			array[i] = array[index];
			array[index] = temp;
		}
		return array;
	}
});
define('admin/artists/edit',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ArtistEdit = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
		return typeof obj;
	} : function (obj) {
		return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var ArtistEdit = exports.ArtistEdit = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router), _dec(_class = function () {
		function ArtistEdit(http, router) {
			_classCallCheck(this, ArtistEdit);

			this.artist = {
				language: 'swedish',
				genre: '',
				decade: ''
			};
			this.genres = ['anime', 'blues/jazz', 'comedy', 'country', 'dance', 'disney', 'folk', 'hard rock', 'hip-hop/rap', 'metal', 'pop', 'punk', 'reggae', 'rock', 'world'];
			this.languages = ['english', 'swedish'];
			this.decades = [1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];

			this.http = http;
			this.router = router;
		}

		ArtistEdit.prototype.activate = function activate(params) {
			var _this = this;

			if (params.id) {
				this.http.fetch('artists/' + params.id).then(function (response) {
					return response.json();
				}).then(function (artist) {
					artist.decade = artist.decade.toString();
					_this.artist = artist;
				}).catch(function () {});
			}
		};

		ArtistEdit.prototype.convertImage = function convertImage() {
			var _this2 = this;

			return new Promise(function (resolve) {
				if (_typeof(_this2.image) !== 'object' || _this2.image.length === 0) {
					resolve();
				} else {
					_this2.image[0].convertToBase64().then(function (data) {
						delete _this2.artist.image;
						_this2.artist.base64Image = data;
						resolve();
					});
				}
			});
		};

		ArtistEdit.prototype.create = function create() {
			var _this3 = this;

			this.convertImage().then(function () {
				_this3.http.fetch('artists', {
					method: 'post',
					body: (0, _aureliaFetchClient.json)(_this3.artist)
				}).then(function (data) {
					_this3.router.navigateToRoute('artists');
				}).catch(function () {});
			});
		};

		ArtistEdit.prototype.update = function update() {
			var _this4 = this;

			this.convertImage().then(function () {
				_this4.http.fetch('artists/' + _this4.artist._id, {
					method: 'put',
					body: (0, _aureliaFetchClient.json)(_this4.artist)
				}).then(function () {
					_this4.router.navigateToRoute('artists');
				}).catch(function () {});
			});
		};

		ArtistEdit.prototype.destroy = function destroy() {
			var _this5 = this;

			this.http.fetch('artists/' + this.artist._id, {
				method: 'delete'
			}).then(function () {
				_this5.router.navigateToRoute('artists');
			}).catch(function () {});
		};

		return ArtistEdit;
	}()) || _class);
});
define('admin/artists/list',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ArtistList = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var ArtistList = exports.ArtistList = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router), _dec(_class = function () {
		function ArtistList(http, router) {
			var _this = this;

			_classCallCheck(this, ArtistList);

			this.router = router;
			http.fetch('artists').then(function (response) {
				return response.json();
			}).then(function (artists) {
				_this.artists = artists;
				_this.filter(_this.search);
			}).catch(function () {});
		}

		ArtistList.prototype.filter = function filter(search) {
			if (search) {
				var found = void 0;
				search = search.toLowerCase();
				this.filteredArtists = this.artists.filter(function (user) {
					found = false;
					Object.keys(user).forEach(function (prop) {
						if (typeof user[prop] === 'string' && user[prop].toLowerCase().indexOf(search) !== -1) {
							found = true;
						}
					});
					return found;
				});
			} else {
				this.filteredArtists = this.artists;
			}
		};

		return ArtistList;
	}()) || _class);
});
define('admin/songs/edit',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SongEdit = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var SongEdit = exports.SongEdit = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router), _dec(_class = function () {
		function SongEdit(http, router) {
			_classCallCheck(this, SongEdit);

			this.song = {
				distortions: [],
				findSongs: []
			};
			this.artists = [];
			this.genres = ['anime', 'blues/jazz', 'comedy', 'country', 'dance', 'disney', 'folk', 'hard rock', 'hip-hop/rap', 'metal', 'pop', 'punk', 'reggae', 'rock', 'world'];
			this.difficulties = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

			this.http = http;
			this.router = router;
		}

		SongEdit.prototype.activate = function activate(params) {
			var _this = this;

			this.http.fetch('artists').then(function (response) {
				return response.json();
			}).then(function (artists) {
				_this.artists = artists;
			}).catch(function () {});
			if (params.id) {
				this.http.fetch('songs/' + params.id).then(function (response) {
					return response.json();
				}).then(function (song) {
					_this.song = song;
					_this.intro = _this.song.intro;
					_this.song.distortions.forEach(function (distortion) {
						distortion.difficulty = distortion.difficulty.toString();
					});
					_this.song.findSongs.forEach(function (findSong) {
						findSong.difficulty = findSong.difficulty.toString();
					});
					if (_this.intro && _this.intro.difficulty) {
						_this.intro.difficulty = _this.intro.difficulty.toString();
					}
				}).catch(function () {});
			}
		};

		SongEdit.prototype.setGenre = function setGenre(artistId) {
			var _this2 = this;

			this.artists.map(function (artist) {
				if (artist._id === artistId) {
					_this2.song.genre = artist.genre;
				}
			});
		};

		SongEdit.prototype.addDistortion = function addDistortion() {
			this.song.distortions.push({});
		};

		SongEdit.prototype.removeDistortion = function removeDistortion(distortion) {
			this.song.distortions.splice(this.song.distortions.indexOf(distortion), 1);
		};

		SongEdit.prototype.addFindSong = function addFindSong() {
			this.song.findSongs.push({});
		};

		SongEdit.prototype.removeFindSong = function removeFindSong(findSong) {
			this.song.findSongs.splice(this.song.findSongs.indexOf(findSong), 1);
		};

		SongEdit.prototype.addIntro = function addIntro() {
			this.intro = {};
			this.song.intro = this.intro;
		};

		SongEdit.prototype.removeIntro = function removeIntro() {
			this.song.intro = null;
		};

		SongEdit.prototype.create = function create() {
			var _this3 = this;

			this.http.fetch('songs', {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(this.song)
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this3.router.navigateToRoute('songs');
			}).catch(function () {});
		};

		SongEdit.prototype.update = function update() {
			var _this4 = this;

			this.http.fetch('songs/' + this.song._id, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(this.song)
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this4.router.navigateToRoute('songs');
			}).catch(function () {});
		};

		SongEdit.prototype.destroy = function destroy() {
			var _this5 = this;

			this.http.fetch('songs/' + this.song._id, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this5.router.navigateToRoute('songs');
			}).catch(function () {});
		};

		return SongEdit;
	}()) || _class);
});
define('admin/songs/list',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SongList = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var SongList = exports.SongList = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router), _dec(_class = function () {
		function SongList(http, router) {
			var _this = this;

			_classCallCheck(this, SongList);

			this.router = router;
			http.fetch('songs').then(function (response) {
				return response.json();
			}).then(function (songs) {
				_this.songs = songs;
				_this.filter(_this.search);
			}).catch(function () {});
		}

		SongList.prototype.filter = function filter(search) {
			if (search) {
				var found = void 0;
				search = search.toLowerCase();
				this.filteredSongs = this.songs.filter(function (song) {
					found = false;
					Object.keys(song).forEach(function (prop) {
						if (typeof song[prop] === 'string' && song[prop].toLowerCase().indexOf(search) !== -1) {
							found = true;
						}
					});
					found = song.artist.name.toLowerCase().indexOf(search) !== -1 ? true : found;
					return found;
				});
			} else {
				this.filteredSongs = this.songs;
			}
		};

		return SongList;
	}()) || _class);
});
define('admin/duel-themes/edit',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DuelThemeEdit = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DuelThemeEdit = exports.DuelThemeEdit = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router), _dec(_class = function () {
		function DuelThemeEdit(http, router) {
			_classCallCheck(this, DuelThemeEdit);

			this.duelTheme = {};

			this.http = http;
			this.router = router;
		}

		DuelThemeEdit.prototype.activate = function activate(params) {
			var _this = this;

			if (params.id) {
				this.http.fetch('duel-themes/' + params.id).then(function (response) {
					return response.json();
				}).then(function (duelTheme) {
					_this.duelTheme = duelTheme;
				}).catch(function () {});
			}
		};

		DuelThemeEdit.prototype.create = function create() {
			var _this2 = this;

			this.http.fetch('duel-themes', {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(this.duelTheme)
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this2.router.navigateToRoute('duel-themes');
			}).catch(function () {});
		};

		DuelThemeEdit.prototype.update = function update() {
			var _this3 = this;

			this.http.fetch('duel-themes/' + this.duelTheme._id, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(this.duelTheme)
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this3.router.navigateToRoute('duel-themes');
			}).catch(function () {});
		};

		DuelThemeEdit.prototype.destroy = function destroy() {
			var _this4 = this;

			this.http.fetch('duel-themes/' + this.duelTheme._id, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this4.router.navigateToRoute('duel-themes');
			}).catch(function () {});
		};

		return DuelThemeEdit;
	}()) || _class);
});
define('admin/duel-themes/list',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DuelThemeList = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DuelThemeList = exports.DuelThemeList = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router), _dec(_class = function () {
		function DuelThemeList(http, router) {
			var _this = this;

			_classCallCheck(this, DuelThemeList);

			this.router = router;
			http.fetch('duel-themes').then(function (response) {
				return response.json();
			}).then(function (duelThemes) {
				_this.duelThemes = duelThemes;
				_this.filter(_this.search);
			}).catch(function () {});
		}

		DuelThemeList.prototype.filter = function filter(search) {
			if (search) {
				search = search.toLowerCase();
				this.filteredDuelThemes = this.duelThemes.filter(function (duelTheme) {
					return duelTheme.theme.toLowerCase().indexOf(search) !== -1 ? true : false;
				});
			} else {
				this.filteredDuelThemes = this.duelThemes;
			}
		};

		return DuelThemeList;
	}()) || _class);
});
define('admin/users/edit',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.UserEdit = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var UserEdit = exports.UserEdit = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router), _dec(_class = function () {
		function UserEdit(http, router) {
			_classCallCheck(this, UserEdit);

			this.user = {};
			this.authorities = ['admin', 'sysadmin'];

			this.http = http;
			this.router = router;
		}

		UserEdit.prototype.activate = function activate(params) {
			var _this = this;

			if (params.id) {
				this.http.fetch('users/' + params.id).then(function (response) {
					return response.json();
				}).then(function (user) {
					_this.user = user;
				}).catch(function () {});
			}
		};

		UserEdit.prototype.create = function create() {
			var _this2 = this;

			this.http.fetch('users', {
				method: 'post',
				body: (0, _aureliaFetchClient.json)(this.user)
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this2.router.navigateToRoute('users');
			}).catch(function () {});
		};

		UserEdit.prototype.update = function update() {
			var _this3 = this;

			this.http.fetch('users/' + this.user._id, {
				method: 'put',
				body: (0, _aureliaFetchClient.json)(this.user)
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this3.router.navigateToRoute('users');
			}).catch(function () {});
		};

		UserEdit.prototype.destroy = function destroy() {
			var _this4 = this;

			this.http.fetch('users/' + this.user._id, {
				method: 'delete'
			}).then(function (response) {
				return response.json();
			}).then(function () {
				_this4.router.navigateToRoute('users');
			}).catch(function () {});
		};

		return UserEdit;
	}()) || _class);
});
define('admin/users/list',['exports', 'aurelia-framework', 'aurelia-fetch-client', 'aurelia-router'], function (exports, _aureliaFramework, _aureliaFetchClient, _aureliaRouter) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.UserList = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var UserList = exports.UserList = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient, _aureliaRouter.Router), _dec(_class = function () {
		function UserList(http, router) {
			var _this = this;

			_classCallCheck(this, UserList);

			this.router = router;
			http.fetch('users').then(function (response) {
				return response.json();
			}).then(function (users) {
				_this.users = users;
				_this.filter(_this.search);
			}).catch(function () {});
		}

		UserList.prototype.filter = function filter(search) {
			if (search) {
				var found = void 0;
				search = search.toLowerCase();
				this.filteredUsers = this.users.filter(function (user) {
					found = false;
					Object.keys(user).forEach(function (prop) {
						if (typeof user[prop] === 'string' && user[prop].toLowerCase().indexOf(search) !== -1) {
							found = true;
						}
					});
					return found;
				});
			} else {
				this.filteredUsers = this.users;
			}
		};

		return UserList;
	}()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"../style/style.css\"></require>\n\t<router-view class=\"main\"></router-view>\n</template>\n"; });
define('text!../node_modules/font-awesome/css/font-awesome.min.css', ['module'], function(module) { module.exports = "/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */@font-face{font-family:'FontAwesome';src:url('../fonts/fontawesome-webfont.eot?v=4.7.0');src:url('../fonts/fontawesome-webfont.eot?#iefix&v=4.7.0') format('embedded-opentype'),url('../fonts/fontawesome-webfont.woff2?v=4.7.0') format('woff2'),url('../fonts/fontawesome-webfont.woff?v=4.7.0') format('woff'),url('../fonts/fontawesome-webfont.ttf?v=4.7.0') format('truetype'),url('../fonts/fontawesome-webfont.svg?v=4.7.0#fontawesomeregular') format('svg');font-weight:normal;font-style:normal}.fa{display:inline-block;font:normal normal normal 14px/1 FontAwesome;font-size:inherit;text-rendering:auto;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.fa-lg{font-size:1.33333333em;line-height:.75em;vertical-align:-15%}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-fw{width:1.28571429em;text-align:center}.fa-ul{padding-left:0;margin-left:2.14285714em;list-style-type:none}.fa-ul>li{position:relative}.fa-li{position:absolute;left:-2.14285714em;width:2.14285714em;top:.14285714em;text-align:center}.fa-li.fa-lg{left:-1.85714286em}.fa-border{padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left{margin-right:.3em}.fa.fa-pull-right{margin-left:.3em}.pull-right{float:right}.pull-left{float:left}.fa.pull-left{margin-right:.3em}.fa.pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(359deg);transform:rotate(359deg)}}.fa-rotate-90{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";-webkit-transform:scale(-1, 1);-ms-transform:scale(-1, 1);transform:scale(-1, 1)}.fa-flip-vertical{-ms-filter:\"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";-webkit-transform:scale(1, -1);-ms-transform:scale(1, -1);transform:scale(1, -1)}:root .fa-rotate-90,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-flip-horizontal,:root .fa-flip-vertical{filter:none}.fa-stack{position:relative;display:inline-block;width:2em;height:2em;line-height:2em;vertical-align:middle}.fa-stack-1x,.fa-stack-2x{position:absolute;left:0;width:100%;text-align:center}.fa-stack-1x{line-height:inherit}.fa-stack-2x{font-size:2em}.fa-inverse{color:#fff}.fa-glass:before{content:\"\\f000\"}.fa-music:before{content:\"\\f001\"}.fa-search:before{content:\"\\f002\"}.fa-envelope-o:before{content:\"\\f003\"}.fa-heart:before{content:\"\\f004\"}.fa-star:before{content:\"\\f005\"}.fa-star-o:before{content:\"\\f006\"}.fa-user:before{content:\"\\f007\"}.fa-film:before{content:\"\\f008\"}.fa-th-large:before{content:\"\\f009\"}.fa-th:before{content:\"\\f00a\"}.fa-th-list:before{content:\"\\f00b\"}.fa-check:before{content:\"\\f00c\"}.fa-remove:before,.fa-close:before,.fa-times:before{content:\"\\f00d\"}.fa-search-plus:before{content:\"\\f00e\"}.fa-search-minus:before{content:\"\\f010\"}.fa-power-off:before{content:\"\\f011\"}.fa-signal:before{content:\"\\f012\"}.fa-gear:before,.fa-cog:before{content:\"\\f013\"}.fa-trash-o:before{content:\"\\f014\"}.fa-home:before{content:\"\\f015\"}.fa-file-o:before{content:\"\\f016\"}.fa-clock-o:before{content:\"\\f017\"}.fa-road:before{content:\"\\f018\"}.fa-download:before{content:\"\\f019\"}.fa-arrow-circle-o-down:before{content:\"\\f01a\"}.fa-arrow-circle-o-up:before{content:\"\\f01b\"}.fa-inbox:before{content:\"\\f01c\"}.fa-play-circle-o:before{content:\"\\f01d\"}.fa-rotate-right:before,.fa-repeat:before{content:\"\\f01e\"}.fa-refresh:before{content:\"\\f021\"}.fa-list-alt:before{content:\"\\f022\"}.fa-lock:before{content:\"\\f023\"}.fa-flag:before{content:\"\\f024\"}.fa-headphones:before{content:\"\\f025\"}.fa-volume-off:before{content:\"\\f026\"}.fa-volume-down:before{content:\"\\f027\"}.fa-volume-up:before{content:\"\\f028\"}.fa-qrcode:before{content:\"\\f029\"}.fa-barcode:before{content:\"\\f02a\"}.fa-tag:before{content:\"\\f02b\"}.fa-tags:before{content:\"\\f02c\"}.fa-book:before{content:\"\\f02d\"}.fa-bookmark:before{content:\"\\f02e\"}.fa-print:before{content:\"\\f02f\"}.fa-camera:before{content:\"\\f030\"}.fa-font:before{content:\"\\f031\"}.fa-bold:before{content:\"\\f032\"}.fa-italic:before{content:\"\\f033\"}.fa-text-height:before{content:\"\\f034\"}.fa-text-width:before{content:\"\\f035\"}.fa-align-left:before{content:\"\\f036\"}.fa-align-center:before{content:\"\\f037\"}.fa-align-right:before{content:\"\\f038\"}.fa-align-justify:before{content:\"\\f039\"}.fa-list:before{content:\"\\f03a\"}.fa-dedent:before,.fa-outdent:before{content:\"\\f03b\"}.fa-indent:before{content:\"\\f03c\"}.fa-video-camera:before{content:\"\\f03d\"}.fa-photo:before,.fa-image:before,.fa-picture-o:before{content:\"\\f03e\"}.fa-pencil:before{content:\"\\f040\"}.fa-map-marker:before{content:\"\\f041\"}.fa-adjust:before{content:\"\\f042\"}.fa-tint:before{content:\"\\f043\"}.fa-edit:before,.fa-pencil-square-o:before{content:\"\\f044\"}.fa-share-square-o:before{content:\"\\f045\"}.fa-check-square-o:before{content:\"\\f046\"}.fa-arrows:before{content:\"\\f047\"}.fa-step-backward:before{content:\"\\f048\"}.fa-fast-backward:before{content:\"\\f049\"}.fa-backward:before{content:\"\\f04a\"}.fa-play:before{content:\"\\f04b\"}.fa-pause:before{content:\"\\f04c\"}.fa-stop:before{content:\"\\f04d\"}.fa-forward:before{content:\"\\f04e\"}.fa-fast-forward:before{content:\"\\f050\"}.fa-step-forward:before{content:\"\\f051\"}.fa-eject:before{content:\"\\f052\"}.fa-chevron-left:before{content:\"\\f053\"}.fa-chevron-right:before{content:\"\\f054\"}.fa-plus-circle:before{content:\"\\f055\"}.fa-minus-circle:before{content:\"\\f056\"}.fa-times-circle:before{content:\"\\f057\"}.fa-check-circle:before{content:\"\\f058\"}.fa-question-circle:before{content:\"\\f059\"}.fa-info-circle:before{content:\"\\f05a\"}.fa-crosshairs:before{content:\"\\f05b\"}.fa-times-circle-o:before{content:\"\\f05c\"}.fa-check-circle-o:before{content:\"\\f05d\"}.fa-ban:before{content:\"\\f05e\"}.fa-arrow-left:before{content:\"\\f060\"}.fa-arrow-right:before{content:\"\\f061\"}.fa-arrow-up:before{content:\"\\f062\"}.fa-arrow-down:before{content:\"\\f063\"}.fa-mail-forward:before,.fa-share:before{content:\"\\f064\"}.fa-expand:before{content:\"\\f065\"}.fa-compress:before{content:\"\\f066\"}.fa-plus:before{content:\"\\f067\"}.fa-minus:before{content:\"\\f068\"}.fa-asterisk:before{content:\"\\f069\"}.fa-exclamation-circle:before{content:\"\\f06a\"}.fa-gift:before{content:\"\\f06b\"}.fa-leaf:before{content:\"\\f06c\"}.fa-fire:before{content:\"\\f06d\"}.fa-eye:before{content:\"\\f06e\"}.fa-eye-slash:before{content:\"\\f070\"}.fa-warning:before,.fa-exclamation-triangle:before{content:\"\\f071\"}.fa-plane:before{content:\"\\f072\"}.fa-calendar:before{content:\"\\f073\"}.fa-random:before{content:\"\\f074\"}.fa-comment:before{content:\"\\f075\"}.fa-magnet:before{content:\"\\f076\"}.fa-chevron-up:before{content:\"\\f077\"}.fa-chevron-down:before{content:\"\\f078\"}.fa-retweet:before{content:\"\\f079\"}.fa-shopping-cart:before{content:\"\\f07a\"}.fa-folder:before{content:\"\\f07b\"}.fa-folder-open:before{content:\"\\f07c\"}.fa-arrows-v:before{content:\"\\f07d\"}.fa-arrows-h:before{content:\"\\f07e\"}.fa-bar-chart-o:before,.fa-bar-chart:before{content:\"\\f080\"}.fa-twitter-square:before{content:\"\\f081\"}.fa-facebook-square:before{content:\"\\f082\"}.fa-camera-retro:before{content:\"\\f083\"}.fa-key:before{content:\"\\f084\"}.fa-gears:before,.fa-cogs:before{content:\"\\f085\"}.fa-comments:before{content:\"\\f086\"}.fa-thumbs-o-up:before{content:\"\\f087\"}.fa-thumbs-o-down:before{content:\"\\f088\"}.fa-star-half:before{content:\"\\f089\"}.fa-heart-o:before{content:\"\\f08a\"}.fa-sign-out:before{content:\"\\f08b\"}.fa-linkedin-square:before{content:\"\\f08c\"}.fa-thumb-tack:before{content:\"\\f08d\"}.fa-external-link:before{content:\"\\f08e\"}.fa-sign-in:before{content:\"\\f090\"}.fa-trophy:before{content:\"\\f091\"}.fa-github-square:before{content:\"\\f092\"}.fa-upload:before{content:\"\\f093\"}.fa-lemon-o:before{content:\"\\f094\"}.fa-phone:before{content:\"\\f095\"}.fa-square-o:before{content:\"\\f096\"}.fa-bookmark-o:before{content:\"\\f097\"}.fa-phone-square:before{content:\"\\f098\"}.fa-twitter:before{content:\"\\f099\"}.fa-facebook-f:before,.fa-facebook:before{content:\"\\f09a\"}.fa-github:before{content:\"\\f09b\"}.fa-unlock:before{content:\"\\f09c\"}.fa-credit-card:before{content:\"\\f09d\"}.fa-feed:before,.fa-rss:before{content:\"\\f09e\"}.fa-hdd-o:before{content:\"\\f0a0\"}.fa-bullhorn:before{content:\"\\f0a1\"}.fa-bell:before{content:\"\\f0f3\"}.fa-certificate:before{content:\"\\f0a3\"}.fa-hand-o-right:before{content:\"\\f0a4\"}.fa-hand-o-left:before{content:\"\\f0a5\"}.fa-hand-o-up:before{content:\"\\f0a6\"}.fa-hand-o-down:before{content:\"\\f0a7\"}.fa-arrow-circle-left:before{content:\"\\f0a8\"}.fa-arrow-circle-right:before{content:\"\\f0a9\"}.fa-arrow-circle-up:before{content:\"\\f0aa\"}.fa-arrow-circle-down:before{content:\"\\f0ab\"}.fa-globe:before{content:\"\\f0ac\"}.fa-wrench:before{content:\"\\f0ad\"}.fa-tasks:before{content:\"\\f0ae\"}.fa-filter:before{content:\"\\f0b0\"}.fa-briefcase:before{content:\"\\f0b1\"}.fa-arrows-alt:before{content:\"\\f0b2\"}.fa-group:before,.fa-users:before{content:\"\\f0c0\"}.fa-chain:before,.fa-link:before{content:\"\\f0c1\"}.fa-cloud:before{content:\"\\f0c2\"}.fa-flask:before{content:\"\\f0c3\"}.fa-cut:before,.fa-scissors:before{content:\"\\f0c4\"}.fa-copy:before,.fa-files-o:before{content:\"\\f0c5\"}.fa-paperclip:before{content:\"\\f0c6\"}.fa-save:before,.fa-floppy-o:before{content:\"\\f0c7\"}.fa-square:before{content:\"\\f0c8\"}.fa-navicon:before,.fa-reorder:before,.fa-bars:before{content:\"\\f0c9\"}.fa-list-ul:before{content:\"\\f0ca\"}.fa-list-ol:before{content:\"\\f0cb\"}.fa-strikethrough:before{content:\"\\f0cc\"}.fa-underline:before{content:\"\\f0cd\"}.fa-table:before{content:\"\\f0ce\"}.fa-magic:before{content:\"\\f0d0\"}.fa-truck:before{content:\"\\f0d1\"}.fa-pinterest:before{content:\"\\f0d2\"}.fa-pinterest-square:before{content:\"\\f0d3\"}.fa-google-plus-square:before{content:\"\\f0d4\"}.fa-google-plus:before{content:\"\\f0d5\"}.fa-money:before{content:\"\\f0d6\"}.fa-caret-down:before{content:\"\\f0d7\"}.fa-caret-up:before{content:\"\\f0d8\"}.fa-caret-left:before{content:\"\\f0d9\"}.fa-caret-right:before{content:\"\\f0da\"}.fa-columns:before{content:\"\\f0db\"}.fa-unsorted:before,.fa-sort:before{content:\"\\f0dc\"}.fa-sort-down:before,.fa-sort-desc:before{content:\"\\f0dd\"}.fa-sort-up:before,.fa-sort-asc:before{content:\"\\f0de\"}.fa-envelope:before{content:\"\\f0e0\"}.fa-linkedin:before{content:\"\\f0e1\"}.fa-rotate-left:before,.fa-undo:before{content:\"\\f0e2\"}.fa-legal:before,.fa-gavel:before{content:\"\\f0e3\"}.fa-dashboard:before,.fa-tachometer:before{content:\"\\f0e4\"}.fa-comment-o:before{content:\"\\f0e5\"}.fa-comments-o:before{content:\"\\f0e6\"}.fa-flash:before,.fa-bolt:before{content:\"\\f0e7\"}.fa-sitemap:before{content:\"\\f0e8\"}.fa-umbrella:before{content:\"\\f0e9\"}.fa-paste:before,.fa-clipboard:before{content:\"\\f0ea\"}.fa-lightbulb-o:before{content:\"\\f0eb\"}.fa-exchange:before{content:\"\\f0ec\"}.fa-cloud-download:before{content:\"\\f0ed\"}.fa-cloud-upload:before{content:\"\\f0ee\"}.fa-user-md:before{content:\"\\f0f0\"}.fa-stethoscope:before{content:\"\\f0f1\"}.fa-suitcase:before{content:\"\\f0f2\"}.fa-bell-o:before{content:\"\\f0a2\"}.fa-coffee:before{content:\"\\f0f4\"}.fa-cutlery:before{content:\"\\f0f5\"}.fa-file-text-o:before{content:\"\\f0f6\"}.fa-building-o:before{content:\"\\f0f7\"}.fa-hospital-o:before{content:\"\\f0f8\"}.fa-ambulance:before{content:\"\\f0f9\"}.fa-medkit:before{content:\"\\f0fa\"}.fa-fighter-jet:before{content:\"\\f0fb\"}.fa-beer:before{content:\"\\f0fc\"}.fa-h-square:before{content:\"\\f0fd\"}.fa-plus-square:before{content:\"\\f0fe\"}.fa-angle-double-left:before{content:\"\\f100\"}.fa-angle-double-right:before{content:\"\\f101\"}.fa-angle-double-up:before{content:\"\\f102\"}.fa-angle-double-down:before{content:\"\\f103\"}.fa-angle-left:before{content:\"\\f104\"}.fa-angle-right:before{content:\"\\f105\"}.fa-angle-up:before{content:\"\\f106\"}.fa-angle-down:before{content:\"\\f107\"}.fa-desktop:before{content:\"\\f108\"}.fa-laptop:before{content:\"\\f109\"}.fa-tablet:before{content:\"\\f10a\"}.fa-mobile-phone:before,.fa-mobile:before{content:\"\\f10b\"}.fa-circle-o:before{content:\"\\f10c\"}.fa-quote-left:before{content:\"\\f10d\"}.fa-quote-right:before{content:\"\\f10e\"}.fa-spinner:before{content:\"\\f110\"}.fa-circle:before{content:\"\\f111\"}.fa-mail-reply:before,.fa-reply:before{content:\"\\f112\"}.fa-github-alt:before{content:\"\\f113\"}.fa-folder-o:before{content:\"\\f114\"}.fa-folder-open-o:before{content:\"\\f115\"}.fa-smile-o:before{content:\"\\f118\"}.fa-frown-o:before{content:\"\\f119\"}.fa-meh-o:before{content:\"\\f11a\"}.fa-gamepad:before{content:\"\\f11b\"}.fa-keyboard-o:before{content:\"\\f11c\"}.fa-flag-o:before{content:\"\\f11d\"}.fa-flag-checkered:before{content:\"\\f11e\"}.fa-terminal:before{content:\"\\f120\"}.fa-code:before{content:\"\\f121\"}.fa-mail-reply-all:before,.fa-reply-all:before{content:\"\\f122\"}.fa-star-half-empty:before,.fa-star-half-full:before,.fa-star-half-o:before{content:\"\\f123\"}.fa-location-arrow:before{content:\"\\f124\"}.fa-crop:before{content:\"\\f125\"}.fa-code-fork:before{content:\"\\f126\"}.fa-unlink:before,.fa-chain-broken:before{content:\"\\f127\"}.fa-question:before{content:\"\\f128\"}.fa-info:before{content:\"\\f129\"}.fa-exclamation:before{content:\"\\f12a\"}.fa-superscript:before{content:\"\\f12b\"}.fa-subscript:before{content:\"\\f12c\"}.fa-eraser:before{content:\"\\f12d\"}.fa-puzzle-piece:before{content:\"\\f12e\"}.fa-microphone:before{content:\"\\f130\"}.fa-microphone-slash:before{content:\"\\f131\"}.fa-shield:before{content:\"\\f132\"}.fa-calendar-o:before{content:\"\\f133\"}.fa-fire-extinguisher:before{content:\"\\f134\"}.fa-rocket:before{content:\"\\f135\"}.fa-maxcdn:before{content:\"\\f136\"}.fa-chevron-circle-left:before{content:\"\\f137\"}.fa-chevron-circle-right:before{content:\"\\f138\"}.fa-chevron-circle-up:before{content:\"\\f139\"}.fa-chevron-circle-down:before{content:\"\\f13a\"}.fa-html5:before{content:\"\\f13b\"}.fa-css3:before{content:\"\\f13c\"}.fa-anchor:before{content:\"\\f13d\"}.fa-unlock-alt:before{content:\"\\f13e\"}.fa-bullseye:before{content:\"\\f140\"}.fa-ellipsis-h:before{content:\"\\f141\"}.fa-ellipsis-v:before{content:\"\\f142\"}.fa-rss-square:before{content:\"\\f143\"}.fa-play-circle:before{content:\"\\f144\"}.fa-ticket:before{content:\"\\f145\"}.fa-minus-square:before{content:\"\\f146\"}.fa-minus-square-o:before{content:\"\\f147\"}.fa-level-up:before{content:\"\\f148\"}.fa-level-down:before{content:\"\\f149\"}.fa-check-square:before{content:\"\\f14a\"}.fa-pencil-square:before{content:\"\\f14b\"}.fa-external-link-square:before{content:\"\\f14c\"}.fa-share-square:before{content:\"\\f14d\"}.fa-compass:before{content:\"\\f14e\"}.fa-toggle-down:before,.fa-caret-square-o-down:before{content:\"\\f150\"}.fa-toggle-up:before,.fa-caret-square-o-up:before{content:\"\\f151\"}.fa-toggle-right:before,.fa-caret-square-o-right:before{content:\"\\f152\"}.fa-euro:before,.fa-eur:before{content:\"\\f153\"}.fa-gbp:before{content:\"\\f154\"}.fa-dollar:before,.fa-usd:before{content:\"\\f155\"}.fa-rupee:before,.fa-inr:before{content:\"\\f156\"}.fa-cny:before,.fa-rmb:before,.fa-yen:before,.fa-jpy:before{content:\"\\f157\"}.fa-ruble:before,.fa-rouble:before,.fa-rub:before{content:\"\\f158\"}.fa-won:before,.fa-krw:before{content:\"\\f159\"}.fa-bitcoin:before,.fa-btc:before{content:\"\\f15a\"}.fa-file:before{content:\"\\f15b\"}.fa-file-text:before{content:\"\\f15c\"}.fa-sort-alpha-asc:before{content:\"\\f15d\"}.fa-sort-alpha-desc:before{content:\"\\f15e\"}.fa-sort-amount-asc:before{content:\"\\f160\"}.fa-sort-amount-desc:before{content:\"\\f161\"}.fa-sort-numeric-asc:before{content:\"\\f162\"}.fa-sort-numeric-desc:before{content:\"\\f163\"}.fa-thumbs-up:before{content:\"\\f164\"}.fa-thumbs-down:before{content:\"\\f165\"}.fa-youtube-square:before{content:\"\\f166\"}.fa-youtube:before{content:\"\\f167\"}.fa-xing:before{content:\"\\f168\"}.fa-xing-square:before{content:\"\\f169\"}.fa-youtube-play:before{content:\"\\f16a\"}.fa-dropbox:before{content:\"\\f16b\"}.fa-stack-overflow:before{content:\"\\f16c\"}.fa-instagram:before{content:\"\\f16d\"}.fa-flickr:before{content:\"\\f16e\"}.fa-adn:before{content:\"\\f170\"}.fa-bitbucket:before{content:\"\\f171\"}.fa-bitbucket-square:before{content:\"\\f172\"}.fa-tumblr:before{content:\"\\f173\"}.fa-tumblr-square:before{content:\"\\f174\"}.fa-long-arrow-down:before{content:\"\\f175\"}.fa-long-arrow-up:before{content:\"\\f176\"}.fa-long-arrow-left:before{content:\"\\f177\"}.fa-long-arrow-right:before{content:\"\\f178\"}.fa-apple:before{content:\"\\f179\"}.fa-windows:before{content:\"\\f17a\"}.fa-android:before{content:\"\\f17b\"}.fa-linux:before{content:\"\\f17c\"}.fa-dribbble:before{content:\"\\f17d\"}.fa-skype:before{content:\"\\f17e\"}.fa-foursquare:before{content:\"\\f180\"}.fa-trello:before{content:\"\\f181\"}.fa-female:before{content:\"\\f182\"}.fa-male:before{content:\"\\f183\"}.fa-gittip:before,.fa-gratipay:before{content:\"\\f184\"}.fa-sun-o:before{content:\"\\f185\"}.fa-moon-o:before{content:\"\\f186\"}.fa-archive:before{content:\"\\f187\"}.fa-bug:before{content:\"\\f188\"}.fa-vk:before{content:\"\\f189\"}.fa-weibo:before{content:\"\\f18a\"}.fa-renren:before{content:\"\\f18b\"}.fa-pagelines:before{content:\"\\f18c\"}.fa-stack-exchange:before{content:\"\\f18d\"}.fa-arrow-circle-o-right:before{content:\"\\f18e\"}.fa-arrow-circle-o-left:before{content:\"\\f190\"}.fa-toggle-left:before,.fa-caret-square-o-left:before{content:\"\\f191\"}.fa-dot-circle-o:before{content:\"\\f192\"}.fa-wheelchair:before{content:\"\\f193\"}.fa-vimeo-square:before{content:\"\\f194\"}.fa-turkish-lira:before,.fa-try:before{content:\"\\f195\"}.fa-plus-square-o:before{content:\"\\f196\"}.fa-space-shuttle:before{content:\"\\f197\"}.fa-slack:before{content:\"\\f198\"}.fa-envelope-square:before{content:\"\\f199\"}.fa-wordpress:before{content:\"\\f19a\"}.fa-openid:before{content:\"\\f19b\"}.fa-institution:before,.fa-bank:before,.fa-university:before{content:\"\\f19c\"}.fa-mortar-board:before,.fa-graduation-cap:before{content:\"\\f19d\"}.fa-yahoo:before{content:\"\\f19e\"}.fa-google:before{content:\"\\f1a0\"}.fa-reddit:before{content:\"\\f1a1\"}.fa-reddit-square:before{content:\"\\f1a2\"}.fa-stumbleupon-circle:before{content:\"\\f1a3\"}.fa-stumbleupon:before{content:\"\\f1a4\"}.fa-delicious:before{content:\"\\f1a5\"}.fa-digg:before{content:\"\\f1a6\"}.fa-pied-piper-pp:before{content:\"\\f1a7\"}.fa-pied-piper-alt:before{content:\"\\f1a8\"}.fa-drupal:before{content:\"\\f1a9\"}.fa-joomla:before{content:\"\\f1aa\"}.fa-language:before{content:\"\\f1ab\"}.fa-fax:before{content:\"\\f1ac\"}.fa-building:before{content:\"\\f1ad\"}.fa-child:before{content:\"\\f1ae\"}.fa-paw:before{content:\"\\f1b0\"}.fa-spoon:before{content:\"\\f1b1\"}.fa-cube:before{content:\"\\f1b2\"}.fa-cubes:before{content:\"\\f1b3\"}.fa-behance:before{content:\"\\f1b4\"}.fa-behance-square:before{content:\"\\f1b5\"}.fa-steam:before{content:\"\\f1b6\"}.fa-steam-square:before{content:\"\\f1b7\"}.fa-recycle:before{content:\"\\f1b8\"}.fa-automobile:before,.fa-car:before{content:\"\\f1b9\"}.fa-cab:before,.fa-taxi:before{content:\"\\f1ba\"}.fa-tree:before{content:\"\\f1bb\"}.fa-spotify:before{content:\"\\f1bc\"}.fa-deviantart:before{content:\"\\f1bd\"}.fa-soundcloud:before{content:\"\\f1be\"}.fa-database:before{content:\"\\f1c0\"}.fa-file-pdf-o:before{content:\"\\f1c1\"}.fa-file-word-o:before{content:\"\\f1c2\"}.fa-file-excel-o:before{content:\"\\f1c3\"}.fa-file-powerpoint-o:before{content:\"\\f1c4\"}.fa-file-photo-o:before,.fa-file-picture-o:before,.fa-file-image-o:before{content:\"\\f1c5\"}.fa-file-zip-o:before,.fa-file-archive-o:before{content:\"\\f1c6\"}.fa-file-sound-o:before,.fa-file-audio-o:before{content:\"\\f1c7\"}.fa-file-movie-o:before,.fa-file-video-o:before{content:\"\\f1c8\"}.fa-file-code-o:before{content:\"\\f1c9\"}.fa-vine:before{content:\"\\f1ca\"}.fa-codepen:before{content:\"\\f1cb\"}.fa-jsfiddle:before{content:\"\\f1cc\"}.fa-life-bouy:before,.fa-life-buoy:before,.fa-life-saver:before,.fa-support:before,.fa-life-ring:before{content:\"\\f1cd\"}.fa-circle-o-notch:before{content:\"\\f1ce\"}.fa-ra:before,.fa-resistance:before,.fa-rebel:before{content:\"\\f1d0\"}.fa-ge:before,.fa-empire:before{content:\"\\f1d1\"}.fa-git-square:before{content:\"\\f1d2\"}.fa-git:before{content:\"\\f1d3\"}.fa-y-combinator-square:before,.fa-yc-square:before,.fa-hacker-news:before{content:\"\\f1d4\"}.fa-tencent-weibo:before{content:\"\\f1d5\"}.fa-qq:before{content:\"\\f1d6\"}.fa-wechat:before,.fa-weixin:before{content:\"\\f1d7\"}.fa-send:before,.fa-paper-plane:before{content:\"\\f1d8\"}.fa-send-o:before,.fa-paper-plane-o:before{content:\"\\f1d9\"}.fa-history:before{content:\"\\f1da\"}.fa-circle-thin:before{content:\"\\f1db\"}.fa-header:before{content:\"\\f1dc\"}.fa-paragraph:before{content:\"\\f1dd\"}.fa-sliders:before{content:\"\\f1de\"}.fa-share-alt:before{content:\"\\f1e0\"}.fa-share-alt-square:before{content:\"\\f1e1\"}.fa-bomb:before{content:\"\\f1e2\"}.fa-soccer-ball-o:before,.fa-futbol-o:before{content:\"\\f1e3\"}.fa-tty:before{content:\"\\f1e4\"}.fa-binoculars:before{content:\"\\f1e5\"}.fa-plug:before{content:\"\\f1e6\"}.fa-slideshare:before{content:\"\\f1e7\"}.fa-twitch:before{content:\"\\f1e8\"}.fa-yelp:before{content:\"\\f1e9\"}.fa-newspaper-o:before{content:\"\\f1ea\"}.fa-wifi:before{content:\"\\f1eb\"}.fa-calculator:before{content:\"\\f1ec\"}.fa-paypal:before{content:\"\\f1ed\"}.fa-google-wallet:before{content:\"\\f1ee\"}.fa-cc-visa:before{content:\"\\f1f0\"}.fa-cc-mastercard:before{content:\"\\f1f1\"}.fa-cc-discover:before{content:\"\\f1f2\"}.fa-cc-amex:before{content:\"\\f1f3\"}.fa-cc-paypal:before{content:\"\\f1f4\"}.fa-cc-stripe:before{content:\"\\f1f5\"}.fa-bell-slash:before{content:\"\\f1f6\"}.fa-bell-slash-o:before{content:\"\\f1f7\"}.fa-trash:before{content:\"\\f1f8\"}.fa-copyright:before{content:\"\\f1f9\"}.fa-at:before{content:\"\\f1fa\"}.fa-eyedropper:before{content:\"\\f1fb\"}.fa-paint-brush:before{content:\"\\f1fc\"}.fa-birthday-cake:before{content:\"\\f1fd\"}.fa-area-chart:before{content:\"\\f1fe\"}.fa-pie-chart:before{content:\"\\f200\"}.fa-line-chart:before{content:\"\\f201\"}.fa-lastfm:before{content:\"\\f202\"}.fa-lastfm-square:before{content:\"\\f203\"}.fa-toggle-off:before{content:\"\\f204\"}.fa-toggle-on:before{content:\"\\f205\"}.fa-bicycle:before{content:\"\\f206\"}.fa-bus:before{content:\"\\f207\"}.fa-ioxhost:before{content:\"\\f208\"}.fa-angellist:before{content:\"\\f209\"}.fa-cc:before{content:\"\\f20a\"}.fa-shekel:before,.fa-sheqel:before,.fa-ils:before{content:\"\\f20b\"}.fa-meanpath:before{content:\"\\f20c\"}.fa-buysellads:before{content:\"\\f20d\"}.fa-connectdevelop:before{content:\"\\f20e\"}.fa-dashcube:before{content:\"\\f210\"}.fa-forumbee:before{content:\"\\f211\"}.fa-leanpub:before{content:\"\\f212\"}.fa-sellsy:before{content:\"\\f213\"}.fa-shirtsinbulk:before{content:\"\\f214\"}.fa-simplybuilt:before{content:\"\\f215\"}.fa-skyatlas:before{content:\"\\f216\"}.fa-cart-plus:before{content:\"\\f217\"}.fa-cart-arrow-down:before{content:\"\\f218\"}.fa-diamond:before{content:\"\\f219\"}.fa-ship:before{content:\"\\f21a\"}.fa-user-secret:before{content:\"\\f21b\"}.fa-motorcycle:before{content:\"\\f21c\"}.fa-street-view:before{content:\"\\f21d\"}.fa-heartbeat:before{content:\"\\f21e\"}.fa-venus:before{content:\"\\f221\"}.fa-mars:before{content:\"\\f222\"}.fa-mercury:before{content:\"\\f223\"}.fa-intersex:before,.fa-transgender:before{content:\"\\f224\"}.fa-transgender-alt:before{content:\"\\f225\"}.fa-venus-double:before{content:\"\\f226\"}.fa-mars-double:before{content:\"\\f227\"}.fa-venus-mars:before{content:\"\\f228\"}.fa-mars-stroke:before{content:\"\\f229\"}.fa-mars-stroke-v:before{content:\"\\f22a\"}.fa-mars-stroke-h:before{content:\"\\f22b\"}.fa-neuter:before{content:\"\\f22c\"}.fa-genderless:before{content:\"\\f22d\"}.fa-facebook-official:before{content:\"\\f230\"}.fa-pinterest-p:before{content:\"\\f231\"}.fa-whatsapp:before{content:\"\\f232\"}.fa-server:before{content:\"\\f233\"}.fa-user-plus:before{content:\"\\f234\"}.fa-user-times:before{content:\"\\f235\"}.fa-hotel:before,.fa-bed:before{content:\"\\f236\"}.fa-viacoin:before{content:\"\\f237\"}.fa-train:before{content:\"\\f238\"}.fa-subway:before{content:\"\\f239\"}.fa-medium:before{content:\"\\f23a\"}.fa-yc:before,.fa-y-combinator:before{content:\"\\f23b\"}.fa-optin-monster:before{content:\"\\f23c\"}.fa-opencart:before{content:\"\\f23d\"}.fa-expeditedssl:before{content:\"\\f23e\"}.fa-battery-4:before,.fa-battery:before,.fa-battery-full:before{content:\"\\f240\"}.fa-battery-3:before,.fa-battery-three-quarters:before{content:\"\\f241\"}.fa-battery-2:before,.fa-battery-half:before{content:\"\\f242\"}.fa-battery-1:before,.fa-battery-quarter:before{content:\"\\f243\"}.fa-battery-0:before,.fa-battery-empty:before{content:\"\\f244\"}.fa-mouse-pointer:before{content:\"\\f245\"}.fa-i-cursor:before{content:\"\\f246\"}.fa-object-group:before{content:\"\\f247\"}.fa-object-ungroup:before{content:\"\\f248\"}.fa-sticky-note:before{content:\"\\f249\"}.fa-sticky-note-o:before{content:\"\\f24a\"}.fa-cc-jcb:before{content:\"\\f24b\"}.fa-cc-diners-club:before{content:\"\\f24c\"}.fa-clone:before{content:\"\\f24d\"}.fa-balance-scale:before{content:\"\\f24e\"}.fa-hourglass-o:before{content:\"\\f250\"}.fa-hourglass-1:before,.fa-hourglass-start:before{content:\"\\f251\"}.fa-hourglass-2:before,.fa-hourglass-half:before{content:\"\\f252\"}.fa-hourglass-3:before,.fa-hourglass-end:before{content:\"\\f253\"}.fa-hourglass:before{content:\"\\f254\"}.fa-hand-grab-o:before,.fa-hand-rock-o:before{content:\"\\f255\"}.fa-hand-stop-o:before,.fa-hand-paper-o:before{content:\"\\f256\"}.fa-hand-scissors-o:before{content:\"\\f257\"}.fa-hand-lizard-o:before{content:\"\\f258\"}.fa-hand-spock-o:before{content:\"\\f259\"}.fa-hand-pointer-o:before{content:\"\\f25a\"}.fa-hand-peace-o:before{content:\"\\f25b\"}.fa-trademark:before{content:\"\\f25c\"}.fa-registered:before{content:\"\\f25d\"}.fa-creative-commons:before{content:\"\\f25e\"}.fa-gg:before{content:\"\\f260\"}.fa-gg-circle:before{content:\"\\f261\"}.fa-tripadvisor:before{content:\"\\f262\"}.fa-odnoklassniki:before{content:\"\\f263\"}.fa-odnoklassniki-square:before{content:\"\\f264\"}.fa-get-pocket:before{content:\"\\f265\"}.fa-wikipedia-w:before{content:\"\\f266\"}.fa-safari:before{content:\"\\f267\"}.fa-chrome:before{content:\"\\f268\"}.fa-firefox:before{content:\"\\f269\"}.fa-opera:before{content:\"\\f26a\"}.fa-internet-explorer:before{content:\"\\f26b\"}.fa-tv:before,.fa-television:before{content:\"\\f26c\"}.fa-contao:before{content:\"\\f26d\"}.fa-500px:before{content:\"\\f26e\"}.fa-amazon:before{content:\"\\f270\"}.fa-calendar-plus-o:before{content:\"\\f271\"}.fa-calendar-minus-o:before{content:\"\\f272\"}.fa-calendar-times-o:before{content:\"\\f273\"}.fa-calendar-check-o:before{content:\"\\f274\"}.fa-industry:before{content:\"\\f275\"}.fa-map-pin:before{content:\"\\f276\"}.fa-map-signs:before{content:\"\\f277\"}.fa-map-o:before{content:\"\\f278\"}.fa-map:before{content:\"\\f279\"}.fa-commenting:before{content:\"\\f27a\"}.fa-commenting-o:before{content:\"\\f27b\"}.fa-houzz:before{content:\"\\f27c\"}.fa-vimeo:before{content:\"\\f27d\"}.fa-black-tie:before{content:\"\\f27e\"}.fa-fonticons:before{content:\"\\f280\"}.fa-reddit-alien:before{content:\"\\f281\"}.fa-edge:before{content:\"\\f282\"}.fa-credit-card-alt:before{content:\"\\f283\"}.fa-codiepie:before{content:\"\\f284\"}.fa-modx:before{content:\"\\f285\"}.fa-fort-awesome:before{content:\"\\f286\"}.fa-usb:before{content:\"\\f287\"}.fa-product-hunt:before{content:\"\\f288\"}.fa-mixcloud:before{content:\"\\f289\"}.fa-scribd:before{content:\"\\f28a\"}.fa-pause-circle:before{content:\"\\f28b\"}.fa-pause-circle-o:before{content:\"\\f28c\"}.fa-stop-circle:before{content:\"\\f28d\"}.fa-stop-circle-o:before{content:\"\\f28e\"}.fa-shopping-bag:before{content:\"\\f290\"}.fa-shopping-basket:before{content:\"\\f291\"}.fa-hashtag:before{content:\"\\f292\"}.fa-bluetooth:before{content:\"\\f293\"}.fa-bluetooth-b:before{content:\"\\f294\"}.fa-percent:before{content:\"\\f295\"}.fa-gitlab:before{content:\"\\f296\"}.fa-wpbeginner:before{content:\"\\f297\"}.fa-wpforms:before{content:\"\\f298\"}.fa-envira:before{content:\"\\f299\"}.fa-universal-access:before{content:\"\\f29a\"}.fa-wheelchair-alt:before{content:\"\\f29b\"}.fa-question-circle-o:before{content:\"\\f29c\"}.fa-blind:before{content:\"\\f29d\"}.fa-audio-description:before{content:\"\\f29e\"}.fa-volume-control-phone:before{content:\"\\f2a0\"}.fa-braille:before{content:\"\\f2a1\"}.fa-assistive-listening-systems:before{content:\"\\f2a2\"}.fa-asl-interpreting:before,.fa-american-sign-language-interpreting:before{content:\"\\f2a3\"}.fa-deafness:before,.fa-hard-of-hearing:before,.fa-deaf:before{content:\"\\f2a4\"}.fa-glide:before{content:\"\\f2a5\"}.fa-glide-g:before{content:\"\\f2a6\"}.fa-signing:before,.fa-sign-language:before{content:\"\\f2a7\"}.fa-low-vision:before{content:\"\\f2a8\"}.fa-viadeo:before{content:\"\\f2a9\"}.fa-viadeo-square:before{content:\"\\f2aa\"}.fa-snapchat:before{content:\"\\f2ab\"}.fa-snapchat-ghost:before{content:\"\\f2ac\"}.fa-snapchat-square:before{content:\"\\f2ad\"}.fa-pied-piper:before{content:\"\\f2ae\"}.fa-first-order:before{content:\"\\f2b0\"}.fa-yoast:before{content:\"\\f2b1\"}.fa-themeisle:before{content:\"\\f2b2\"}.fa-google-plus-circle:before,.fa-google-plus-official:before{content:\"\\f2b3\"}.fa-fa:before,.fa-font-awesome:before{content:\"\\f2b4\"}.fa-handshake-o:before{content:\"\\f2b5\"}.fa-envelope-open:before{content:\"\\f2b6\"}.fa-envelope-open-o:before{content:\"\\f2b7\"}.fa-linode:before{content:\"\\f2b8\"}.fa-address-book:before{content:\"\\f2b9\"}.fa-address-book-o:before{content:\"\\f2ba\"}.fa-vcard:before,.fa-address-card:before{content:\"\\f2bb\"}.fa-vcard-o:before,.fa-address-card-o:before{content:\"\\f2bc\"}.fa-user-circle:before{content:\"\\f2bd\"}.fa-user-circle-o:before{content:\"\\f2be\"}.fa-user-o:before{content:\"\\f2c0\"}.fa-id-badge:before{content:\"\\f2c1\"}.fa-drivers-license:before,.fa-id-card:before{content:\"\\f2c2\"}.fa-drivers-license-o:before,.fa-id-card-o:before{content:\"\\f2c3\"}.fa-quora:before{content:\"\\f2c4\"}.fa-free-code-camp:before{content:\"\\f2c5\"}.fa-telegram:before{content:\"\\f2c6\"}.fa-thermometer-4:before,.fa-thermometer:before,.fa-thermometer-full:before{content:\"\\f2c7\"}.fa-thermometer-3:before,.fa-thermometer-three-quarters:before{content:\"\\f2c8\"}.fa-thermometer-2:before,.fa-thermometer-half:before{content:\"\\f2c9\"}.fa-thermometer-1:before,.fa-thermometer-quarter:before{content:\"\\f2ca\"}.fa-thermometer-0:before,.fa-thermometer-empty:before{content:\"\\f2cb\"}.fa-shower:before{content:\"\\f2cc\"}.fa-bathtub:before,.fa-s15:before,.fa-bath:before{content:\"\\f2cd\"}.fa-podcast:before{content:\"\\f2ce\"}.fa-window-maximize:before{content:\"\\f2d0\"}.fa-window-minimize:before{content:\"\\f2d1\"}.fa-window-restore:before{content:\"\\f2d2\"}.fa-times-rectangle:before,.fa-window-close:before{content:\"\\f2d3\"}.fa-times-rectangle-o:before,.fa-window-close-o:before{content:\"\\f2d4\"}.fa-bandcamp:before{content:\"\\f2d5\"}.fa-grav:before{content:\"\\f2d6\"}.fa-etsy:before{content:\"\\f2d7\"}.fa-imdb:before{content:\"\\f2d8\"}.fa-ravelry:before{content:\"\\f2d9\"}.fa-eercast:before{content:\"\\f2da\"}.fa-microchip:before{content:\"\\f2db\"}.fa-snowflake-o:before{content:\"\\f2dc\"}.fa-superpowers:before{content:\"\\f2dd\"}.fa-wpexplorer:before{content:\"\\f2de\"}.fa-meetup:before{content:\"\\f2e0\"}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);border:0}.sr-only-focusable:active,.sr-only-focusable:focus{position:static;width:auto;height:auto;margin:0;overflow:visible;clip:auto}\n"; });
define('text!../style/home.css', ['module'], function(module) { module.exports = ".home .login {\n    max-width: 300px;\n    margin: auto;\n    padding-top: 30vh;\n}\n"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"home\">\n\t\t<form class=\"login\">\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"username\">Username</label>\n\t\t\t\t<input value.bind=\"username\" type=\"text\" id=\"username\" autofocus />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"password\">Password</label>\n\t\t\t\t<input value.bind=\"password\" type=\"password\" id=\"password\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<button click.delegate=\"login()\" class=\"btn btn-block\">Login</button>\n\t\t\t</div>\n\t\t</div>\n\t</form>\n</template>\n"; });
define('text!../style/splash.css', ['module'], function(module) { module.exports = ".splash {\n\ttext-align: center;\n\tmargin: 10% 0 0 0;\n\tbox-sizing: border-box;\n}\n.splash .message {\n\tfont-size: 72px;\n\tline-height: 72px;\n\ttext-shadow: rgba(0, 0, 0, .5) 0 0 15px;\n\ttext-transform: uppercase;\n\tfont-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n.splash .fa-spinner {\n\ttext-align: center;\n\tdisplay: inline-block;\n\tfont-size: 72px;\n\tmargin-top: 50px;\n}\n"; });
define('text!admin/admin.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"admin\">\n\t\t<nav class=\"navbar\" role=\"navigation\">\n\t\t\t<ul>\n\t\t\t\t<li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n\t\t\t\t\t<a href.bind=\"row.href\">${row.title}</a>\n\t\t\t\t</li>\n\t\t\t</ul>\n\t\t</nav>\n\n\t\t<article>\n\t\t\t<h1>${router.currentInstruction.config.title}</h1>\n\t\t\t<router-view></router-view>\n\t\t</article>\n\t\t<div class=\"clearfix\"></div>\n\t</div>\n</template>\n"; });
define('text!games/duel.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"../score/score\"></require>\n\t<score></score>\n\t<div class=\"duel\">\n\t\t<div class=\"vertical-align-outer\">\n\t\t\t<div class=\"letters vertical-align-inner\">\n\t\t\t\t${duelTheme.theme}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n"; });
define('text!../style/style.css', ['module'], function(module) { module.exports = "* {\n    box-sizing: border-box;\n}\nhtml {\n    height: 100%;\n    font-family: sans-serif;\n    -ms-text-size-adjust: 100%;\n    -webkit-text-size-adjust: 100%;\n}\nbody {\n    background: #000;\n    color: #fff;\n    font-size: 14px;\n    height: 100%;\n    line-height: 1;\n    margin: 0;\n}\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n    display: block;\n}\na {\n    background: transparent;\n    color: #fff;\n    font-size: 100%;\n    margin: 0;\n    padding: 0;\n    text-decoration: none;\n    vertical-align: baseline;\n}\na:active, a:hover {\n    outline: 0;\n}\nsmall {\n    font-size: 80%;\n}\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\nhr {\n    border: 0;\n    border-top: 1px solid #ccc;\n    display: block;\n    height: 1px;\n    margin: 1em 0;\n    padding: 0;\n}\ninput, select {\n    vertical-align: middle;\n}\nimg {\n    display: block;\n    max-width: 100%;\n    border: 0;\n}\nul, ol {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n}\nhtml {\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n    color: #fff;\n}\nh1, h2, h3, h4, h5, h6 {\n    margin-top: 0;\n}\nh1 {\n    font-size: 48px;\n    margin-bottom: .3em;\n    text-transform: uppercase;\n}\nh2 {\n    font-size: 34px;\n    margin-bottom: .3em;\n    text-transform: uppercase;\n}\nh3 {\n    font-size: 28px;\n    margin-bottom: .4em;\n}\nh4 {\n    font-size: 24px;\n    margin-bottom: .4em;\n}\nh5 {\n    font-size: 20px;\n    margin-bottom: .5em;\n}\nh6 {\n    font-size: 18px;\n}\np {\n    font-size: 13px;\n    margin-bottom: 1.5em;\n}\na {\n    color: #fff;\n    decoration: none;\n}\na:hover {\n    color: darken(#fff, 15%);\n    decoration: underline;\n}\n.bold {\n    font-weight: bold;\n}\n.float-left {\n    float: left;\n}\n.float-right {\n    float: right;\n}\n.clear-fix, .clearfix {\n    clear: both;\n}\n.pointer {\n    cursor: pointer;\n}\n.capitalize {\n    text-transform: capitalize;\n}\n.vertical-align-outer {\n    display: table;\n    height: 100%;\n    margin: auto;\n}\n.vertical-align-outer .vertical-align-inner {\n    display: table-cell;\n    vertical-align: middle;\n}\nlabel {\n    display: inline-block;\n    max-width: 100%;\n    margin-bottom: 5px;\n    font-weight: 700;\n}\ninput {\n    display: block;\n    width: 100%;\n    font-size: 14px;\n    line-height: 22px;\n    height: 34px;\n    padding: 6px 12px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n}\nselect {\n    display: block;\n    width: 100%;\n    font-size: 14px;\n    line-height: 22px;\n    height: 34px;\n    padding: 6px 12px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n}\nselect.multiple {\n    height: 100%;\n}\ntextarea {\n    display: block;\n    width: 100%;\n    height: auto;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 20px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n}\n.form-group {\n    margin-bottom: 15px;\n}\n.btn {\n    display: inline-block;\n    padding: 6px 12px;\n    margin-bottom: 0;\n    font-size: 14px;\n    font-weight: 400;\n    line-height: 20px;\n    text-align: center;\n    white-space: nowrap;\n    vertical-align: middle;\n    touch-action: manipulation;\n    cursor: pointer;\n    user-select: none;\n    -webkit-user-select: none;\n    border: 1px solid darken(#424242, 10%);\n    border-radius: 4px;\n    color: #fff;\n    background: #424242;\n}\n.btn:hover {\n    background-color: darken(#424242, 10%);\n}\n.btn-block {\n    display: block;\n    width: 100%;\n}\n.btn-left {\n    width: calc(50% - 10px);\n    float: left;\n}\n.btn-right {\n    width: calc(50% - 10px);\n    float: right;\n}\n.btn-primary {\n    background-color: #2a9fd6;\n    border-color: darken(#2a9fd6, 10%);\n}\n.btn-primary:hover {\n    background-color: darken(#2a9fd6, 10%);\n}\n.btn-success {\n    background-color: #77b300;\n    border-color: darken(#77b300, 10%);\n}\n.btn-success:hover {\n    background-color: darken(#77b300, 10%);\n}\n.btn-info {\n    background-color: #9933cc;\n    border-color: darken(#9933cc, 10%);\n}\n.btn-info:hover {\n    background-color: darken(#9933cc, 10%);\n}\n.btn-warning {\n    background-color: #ff8800;\n    border-color: darken(#ff8800, 10%);\n}\n.btn-warning:hover {\n    background-color: darken(#ff8800, 10%);\n}\n.btn-danger {\n    background: #cc0000;\n    border-color: darken(#cc0000, 10%);\n}\n.btn-danger:hover {\n    background-color: darken(#cc0000, 10%);\n}\ntable {\n    width: 100%;\n}\nthead {\n    border-bottom: 1px solid #fff;\n}\n.table-striped tbody tr {}\n.table-striped tbody tr:nth-of-type(odd) {\n    background: lighten(#000, 5%);\n}\ntbody.table-hover tr, .table-hover tr {\n    cursor: pointer;\n}\ntbody.table-hover tr:hover, .table-hover tr:hover {\n    background: lighten(#000, 20%);\n}\nth {\n    text-align: left;\n    padding: 8px;\n    border-bottom: 2px solid #333;\n}\ntd {\n    padding: 5px;\n    line-height: 20px;\n    vertical-align: top;\n    border-top: 1px solid #333;\n}\n\n\nbody {\n    margin: 0;\n    background: #000;\n    width: 100vw;\n    height: 100vh;\n}\n\n\n.logo {\n    margin: auto;\n    padding: 30px;\n}\n\n\n.fullscreen {\n    text-align: center;\n}\n\n\n.fullscreen span {\n    cursor: pointer;\n    display: inline-block;\n    padding: 20px;\n}\n\n.splash {\n    text-align: center;\n    margin: 10% 0 0 0;\n    box-sizing: border-box;\n}\n\n.splash .message {\n    font-size: 72px;\n    line-height: 72px;\n    text-shadow: rgba(0, 0, 0, 0.5) 0 0 15px;\n    text-transform: uppercase;\n    font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n}\n\n.splash .fa-spinner {\n    text-align: center;\n    display: inline-block;\n    font-size: 72px;\n    margin-top: 50px;\n}\n\n.home .login {\n    max-width: 300px;\n    margin: auto;\n    padding-top: 30vh;\n}\n.admin {\n    max-width: 1080px;\n    margin: 10px auto;\n    padding: 20px;\n}\n.admin .navbar {\n    float: left;\n    width: 180px;\n    font-size: 16px;\n}\n.admin .navbar a {\n    display: block;\n    width: 100%;\n    padding: 5px;\n}\n.admin .navbar a:hover {\n    color: #900;\n}\n.admin article {\n    float: right;\n    width: calc(100% - 220px);\n}\n.admin .controls {\n    display: flex;\n    margin-bottom: 15px;\n}\n.admin .controls .search {\n    margin-right: 10px;\n}\n.admin .controls .new {\n    margin-left: 10px;\n}\n.admin .song-edit .distortions h4, .admin .song-edit .findSongs h4, .admin .song-edit .intro h4 {\n    margin: 0;\n    line-height: 34px;\n    float: left;\n}\n.admin .song-edit .distortions .add, .admin .song-edit .distortions .remove, .admin .song-edit .findSongs .add, .admin .song-edit .findSongs .remove, .admin .song-edit .intro .add, .admin .song-edit .intro .remove {\n    margin: 0 10px;\n    float: left;\n}\n.admin .song-edit .distortions .clearfix, .admin .song-edit .findSongs .clearfix, .admin .song-edit .intro .clearfix {\n    height: 10px;\n}\n.admin .song-edit .distortions {\n    padding-top: 20px;\n}\n.admin .song-edit .distortions .form-group, .admin .song-edit .findSongs .form-group {\n    float: left;\n}\n.admin .song-edit .distortions .form-group:nth-child(1), .admin .song-edit .findSongs .form-group:nth-child(1) {\n    width: calc(75% - 39px);\n    margin-right: 10px;\n}\n.admin .song-edit .distortions .form-group:nth-child(2), .admin .song-edit .findSongs .form-group:nth-child(2) {\n    width: calc(25% - 39px);\n    margin: 0 10px;\n}\n.admin .song-edit .distortions .fa-trash, .admin .song-edit .findSongs .fa-trash {\n    float: right;\n    margin-top: 18px;\n    width: 38px;\n}\n.admin .song-edit .intro .intro-container .form-group {}\n.admin .song-edit .intro .intro-container .form-group:nth-child(1) {\n    width: calc(80% - 10px);\n    float: left;\n}\n.admin .song-edit .intro .intro-container .form-group:nth-child(2) {\n    width: calc(20% - 10px);\n    float: right;\n}\n.admin .song-edit .intro .intro-container .form-group:nth-child(4) {\n    width: calc(33.33333% - 13.333334px);\n    float: left;\n    margin-right: 10px;\n}\n.admin .song-edit .intro .intro-container .form-group:nth-child(5) {\n    width: calc(33.33333% - 13.333334px);\n    float: left;\n    margin: 0 10px;\n}\n.admin .song-edit .intro .intro-container .form-group:nth-child(6) {\n    width: calc(33.33333% - 13.333334px);\n    float: right;\n    margin-left: 10px;\n}\n.game-menu {\n    margin: auto;\n    max-width: 940px;\n}\n.game-menu h1 {\n    text-align: center;\n    margin-top: 100px;\n    margin-bottom: 50px;\n}\n.game-menu .game-list a {\n    border: 1px solid #fff;\n    cursor: pointer;\n    display: block;\n    float: left;\n    margin: 10px;\n    padding: 20px;\n    text-align: center;\n    width: calc(33.33333% - 20px);\n}\n.settings {\n    padding-top: 20px;\n    text-align: center;\n}\n.red-team, .blue-team {\n    cursor: pointer;\n    font-size: 48px;\n    padding: 10px 20px;\n    position: absolute;\n    top: 0;\n}\n.red-team {\n    background: #a00;\n    border-bottom-right-radius: 10px;\n    left: 0;\n}\n.blue-team {\n    background: #56e;\n    border-bottom-left-radius: 10px;\n    right: 0;\n}\n.guess-artist img {\n    display: block;\n    height: 100vh;\n    width: 100vw;\n    margin: auto;\n    object-fit: contain;\n}\n.guess-artist span {\n    background: rgba(0,0,0,.4);\n    bottom: 30px;\n    color: #fff;\n    font-size: 48px;\n    padding: 5px 0;\n    position: absolute;\n    text-align: center;\n    width: 100%;\n}\n.find-songs {\n    height: 100vh;\n}\n.find-songs .phrase {\n    font-size: 48px;\n    margin: auto;\n    width: auto;\n}\n.find-songs .phrase div {\n    background: #56e;\n    border-radius: 5px;\n    display: inline-block;\n    margin: 0 8px;\n    padding: 10px;\n    position: relative;\n    cursor: pointer;\n}\n.find-songs .phrase .word {\n    display: block;\n    min-width: 160px;\n    text-align: center;\n    visibility: hidden;\n}\n.find-songs .phrase .index {\n    left: 0;\n    position: absolute;\n    text-align: center;\n    width: 100%;\n}\n.duel {\n    height: 100vh;\n    font-size: 72px;\n    line-height: 1.3em;\n    text-align: center;\n}\n.intros {\n    height: 100vh;\n    font-size: 48px;\n    line-height: 1.3em;\n    text-align: center;\n}\n.intros #player {\n    display: none;\n}\n.title-distortions {\n    height: 100vh;\n    font-size: 72px;\n    line-height: 1.3em;\n    text-align: center;\n}\n"; });
define('text!../style/admin/admin.css', ['module'], function(module) { module.exports = ".admin {\n\tmax-width: 1080px;\n\tmargin: 10px auto;\n\tpadding: 20px;\n}\n.admin .navbar {\n\tfloat: left;\n\twidth: 180px;\n\tfont-size: 16px;\n}\n.admin .navbar a {\n\tdisplay: block;\n\twidth: 100%;\n\tpadding: 5px\n}\n.admin .navbar a:hover {\n\tcolor: #900;\n}\n.admin article {\n\tfloat: right;\n\twidth: calc(100% - 220px);\n}\n.admin .controls {\n\tdisplay: -ms-flexbox;\n\tdisplay: flex;\n\tmargin-bottom: 15px;\n}\n.admin .controls .search {\n\tmargin-right: 10px;\n}\n.admin .controls .new {\n\tmargin-left: 10px;\n}\n.admin .song-edit .distortions h4, .admin .song-edit .findSongs h4, .admin .song-edit .intro h4 {\n\tmargin: 0;\n\tline-height: 34px;\n\tfloat: left;\n}\n.admin .song-edit .distortions .add, .admin .song-edit .distortions .remove, .admin .song-edit .findSongs .add, .admin .song-edit .findSongs .remove, .admin .song-edit .intro .add, .admin .song-edit .intro .remove {\n\tmargin: 0 10px;\n\tfloat: left;\n}\n.admin .song-edit .distortions .clearfix, .admin .song-edit .findSongs .clearfix, .admin .song-edit .intro .clearfix {\n\theight: 10px;\n}\n.admin .song-edit .distortions {\n\tpadding-top: 20px;\n}\n.admin .song-edit .distortions .form-group, .admin .song-edit .findSongs .form-group {\n\tfloat: left\n}\n.admin .song-edit .distortions .form-group:nth-child(1), .admin .song-edit .findSongs .form-group:nth-child(1) {\n\twidth: calc(75% - 39px);\n\tmargin-right: 10px;\n}\n.admin .song-edit .distortions .form-group:nth-child(2), .admin .song-edit .findSongs .form-group:nth-child(2) {\n\twidth: calc(25% - 39px);\n\tmargin: 0 10px;\n}\n.admin .song-edit .distortions .fa-trash, .admin .song-edit .findSongs .fa-trash {\n\tfloat: right;\n\tmargin-top: 18px;\n\twidth: 38px;\n}\n.admin .song-edit .intro .intro-container .form-group {}\n.admin .song-edit .intro .intro-container .form-group:nth-child(1) {\n\twidth: calc(80% - 10px);\n\tfloat: left;\n}\n.admin .song-edit .intro .intro-container .form-group:nth-child(2) {\n\twidth: calc(20% - 10px);\n\tfloat: right;\n}\n.admin .song-edit .intro .intro-container .form-group:nth-child(4) {\n\twidth: calc(33.33333% - 13.333334px);\n\tfloat: left;\n\tmargin-right: 10px;\n}\n.admin .song-edit .intro .intro-container .form-group:nth-child(5) {\n\twidth: calc(33.33333% - 13.333334px);\n\tfloat: left;\n\tmargin: 0 10px;\n}\n.admin .song-edit .intro .intro-container .form-group:nth-child(6) {\n\twidth: calc(33.33333% - 13.333334px);\n\tfloat: right;\n\tmargin-left: 10px;\n}\n"; });
define('text!games/find-songs.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"../score/score\"></require>\n\t<score></score>\n\t<div class=\"find-songs\">\n\t\t<div class=\"vertical-align-outer\">\n\t\t\t<div class=\"phrase vertical-align-inner\" if.bind=\"findSong\">\n\t\t\t\t<div repeat.for=\"phrase of findSong.phrase.split(' ')\" click.delegate=\"show($index)\">\n\t\t\t\t\t<span class=\"index\">${$index + 1}</span>\n\t\t\t\t\t<span class=\"word\">${phrase}</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n"; });
define('text!../style/games/duel.css', ['module'], function(module) { module.exports = ".duel {\n\theight: 100vh;\n\tfont-size: 72px;\n\tline-height: 1.3em;\n\ttext-align: center;\n}\n"; });
define('text!games/games.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"game-menu\">\n\t\t<h1>Sing or Wing</h1>\n\t\t<nav class=\"game-list\">\n\t\t\t<a repeat.for=\"row of router.navigation\" href.bind=\"row.href\">${row.title}</a>\n\t\t</nav>\n\t</div>\n\t<div class=\"clearfix\"></div>\n\t<div class=\"settings\">\n\t\t<a click.delegate=\"reset()\" class=\"pointer\">Reset</a>\n\t</div>\n</template>\n"; });
define('text!../style/games/find-songs.css', ['module'], function(module) { module.exports = ".find-songs {\n\theight: 100vh;\n}\n.find-songs .phrase {\n\tfont-size: 48px;\n\tmargin: auto;\n\twidth: auto;\n}\n.find-songs .phrase div {\n\tbackground: #56e;\n\tborder-radius: 5px;\n\tdisplay: inline-block;\n\tmargin: 0 8px;\n\tpadding: 10px;\n\tposition: relative;\n\tcursor: pointer;\n}\n.find-songs .phrase .word {\n\tdisplay: block;\n\tmin-width: 160px;\n\ttext-align: center;\n\tvisibility: hidden;\n}\n.find-songs .phrase .index {\n\tleft: 0;\n\tposition: absolute;\n\ttext-align: center;\n\twidth: 100%;\n}\n"; });
define('text!games/guess-artist.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"../score/score\"></require>\n\t<score></score>\n\t<div class=\"guess-artist\">\n\t\t<img if.bind=\"artist\" src=\"images/${artist.image}\" alt=\"${artist.name}\" />\n\t\t<span>${artist.name}</span>\n\t</div>\n</template>\n"; });
define('text!../style/games/guess-artist.css', ['module'], function(module) { module.exports = ".guess-artist img {\n    display:block;\n    height:100vh;\n    width: 100vw;\n    margin:auto;\n    object-fit: contain;\n}\n.guess-artist span {\n    background:rgba(0, 0, 0, .4);\n    bottom:30px;\n    color:#fff;\n    font-size:48px;\n    padding:5px 0;\n    position:absolute;\n    text-align:center;\n    width:100%;\n}\n"; });
define('text!games/intros.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"../score/score\"></require>\n\t<score></score>\n\t<div class=\"intros\">\n\t\t<div id=\"player\"></div>\n\t\t<div class=\"vertical-align-outer\">\n\t\t\t<div class=\"vertical-align-inner\">\n\t\t\t\t${title}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n"; });
define('text!../style/games/intros.css', ['module'], function(module) { module.exports = ".intros {\n\theight: 100vh;\n\tfont-size: 48px;\n\tline-height: 1.3em;\n\ttext-align: center;\n}\n.intros #player {\n\tdisplay: none;\n}\n"; });
define('text!games/title-distortions.html', ['module'], function(module) { module.exports = "<template>\n\t<require from=\"../score/score\"></require>\n\t<score></score>\n\t<div class=\"title-distortions\">\n\t\t<div class=\"vertical-align-outer\">\n\t\t\t<div class=\"letters vertical-align-inner\">\n\t\t\t\t${distortion.distortion}\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n"; });
define('text!../style/games/menu.css', ['module'], function(module) { module.exports = ".game-menu {\n\tmargin: auto;\n\tmax-width: 940px;\n}\n\n.game-menu h1 {\n\ttext-align: center;\n\tmargin-top: 100px;\n\tmargin-bottom: 50px;\n}\n\n.game-menu .game-list a {\n\tborder: 1px solid #fff;\n\tcursor: pointer;\n\tdisplay: block;\n\tfloat: left;\n\tmargin: 10px;\n\tpadding: 20px;\n\ttext-align: center;\n\twidth: calc(33.33333% - 20px);\n}\n\n.settings {\n\tpadding-top: 20px;\n\ttext-align: center;\n}\n"; });
define('text!score/score.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"red-team\" click.delegate=\"addRedScore()\">\n\t\t${red}\n\t</div>\n\t<div class=\"blue-team\" click.delegate=\"addBlueScore()\">\n\t\t${blue}\n\t</div>\n</template>\n"; });
define('text!../style/games/title-distortions.css', ['module'], function(module) { module.exports = ".title-distortions {\n\theight: 100vh;\n\tfont-size: 72px;\n\tline-height: 1.3em;\n\ttext-align: center;\n}\n"; });
define('text!admin/artists/edit.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"artist-edit\">\n\t\t<form>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"name\">Name</label>\n\t\t\t\t<input value.bind=\"artist.name\" type=\"text\" id=\"name\" autofocus />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"difficulty\">Difficulty ${artist.difficulty}</label>\n\t\t\t\t<input value.bind=\"artist.difficulty\" type=\"range\" min=\"1\" max=\"10\" id=\"difficulty\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"genre\">Genre</label>\n\t\t\t\t<select value.bind=\"artist.genre\" id=\"genre\" class=\"capitalize\">\n\t\t\t\t\t<option value=\"\" selected disabled>Select Genre</option>\n\t\t\t\t\t<option repeat.for=\"genre of genres\" >${genre}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"decade\">Decade</label>\n\t\t\t\t<select value.bind=\"artist.decade\" id=\"decade\">\n\t\t\t\t\t<option value=\"\" selected disabled>Select Decade</option>\n\t\t\t\t\t<option repeat.for=\"decade of decades\" value=\"${decade}\">${decade}s</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"language\">Language</label>\n\t\t\t\t<select value.bind=\"artist.language\" id=\"language\" class=\"capitalize\">\n\t\t\t\t\t<option repeat.for=\"language of languages\">${language}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"image\">Image: ${image ? image[0].name : artist.image}</label>\n\t\t\t\t<input files.bind=\"image\" type=\"file\" accept=\"image/*\" id=\"image\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"members\">Members</label>\n\t\t\t\t<textarea value.bind=\"artist.members\" rows=\"5\" id=\"members\"></textarea>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"biography\">Biography</label>\n\t\t\t\t<textarea value.bind=\"artist.biography\" rows=\"10\" id=\"biography\"></textarea>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<button if.bind=\"!artist._id\" click.delegate=\"create()\" class=\"btn btn-block btn-success create\">Create</button>\n\t\t\t\t<button if.bind=\"artist._id\" click.delegate=\"update()\" class=\"btn btn-success btn-left update\">Update</button>\n\t\t\t\t<button if.bind=\"artist._id\" click.delegate=\"destroy()\" class=\"btn btn-danger btn-right update\">Delete</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</template>\n"; });
define('text!../style/global/forms.css', ['module'], function(module) { module.exports = "label {\n\tdisplay: inline-block;\n\tmax-width: 100%;\n\tmargin-bottom: 5px;\n\tfont-weight: 700;\n}\n\ninput {\n\tdisplay: block;\n\twidth: 100%;\n\tfont-size: 14px;\n\tline-height: 22px;\n\theight: 34px;\n\tpadding: 6px 12px;\n\tborder: 1px solid #ccc;\n\tborder-radius: 4px;\n}\n\nselect {\n\tdisplay: block;\n\twidth: 100%;\n\tfont-size: 14px;\n\tline-height: 22px;\n\theight: 34px;\n\tpadding: 6px 12px;\n\tborder: 1px solid #ccc;\n\tborder-radius: 4px\n}\n\nselect.multiple {\n\theight: 100%;\n}\n\ntextarea {\n\tdisplay: block;\n    width: 100%;\n    height: auto;\n    padding: 6px 12px;\n    font-size: 14px;\n    line-height: 20px;\n    border: 1px solid #ccc;\n    border-radius: 4px;\n}\n\n.form-group {\n\tmargin-bottom: 15px;\n}\n\n.btn {\n\tdisplay: inline-block;\n    padding: 6px 12px;\n    margin-bottom: 0;\n    font-size: 14px;\n    font-weight: 400;\n    line-height: 20px;\n    text-align: center;\n    white-space: nowrap;\n    vertical-align: middle;\n    -ms-touch-action: manipulation;\n        touch-action: manipulation;\n    cursor: pointer;\n    -moz-user-select: none;\n     -ms-user-select: none;\n         user-select: none;\n    -webkit-user-select: none;\n    border: 1px solid darken(#424242, 10%);\n    border-radius: 4px;\n\tcolor: #fff;\n    background: #424242\n}\n\n.btn:hover {\n\tbackground-color: darken(#424242, 10%);\n}\n\n.btn-block {\n\tdisplay: block;\n\twidth: 100%;\n}\n\n.btn-left {\n\twidth: calc(50% - 10px);\n\tfloat: left;\n}\n.btn-right {\n\twidth: calc(50% - 10px);\n\tfloat: right;\n}\n\n.btn-primary {\n\tbackground-color: #2a9fd6;\n\tborder-color: darken(#2a9fd6, 10%)\n}\n\n.btn-primary:hover {\n\tbackground-color: darken(#2a9fd6, 10%);\n}\n.btn-success {\n\tbackground-color: #77b300;\n\tborder-color: darken(#77b300, 10%)\n}\n.btn-success:hover {\n\tbackground-color: darken(#77b300, 10%);\n}\n.btn-info {\n\tbackground-color: #9933cc;\n\tborder-color: darken(#9933cc, 10%)\n}\n.btn-info:hover {\n\tbackground-color: darken(#9933cc, 10%);\n}\n.btn-warning {\n\tbackground-color: #ff8800;\n\tborder-color: darken(#ff8800, 10%)\n}\n.btn-warning:hover {\n\tbackground-color: darken(#ff8800, 10%);\n}\n.btn-danger {\n\tbackground: #cc0000;\n\tborder-color: darken(#cc0000, 10%)\n}\n.btn-danger:hover {\n\tbackground-color: darken(#cc0000, 10%);\n}\n"; });
define('text!admin/artists/list.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"artist-list\">\n\t\t<div class=\"controls\">\n\t\t\t<input value.bind=\"search\" type=\"text\" class=\"search\" placeholder=\"Search\" change.bind=\"filter(search)\" />\n\t\t\t<a class=\"new btn btn-primary\" route-href=\"route: artist-create\">New</a>\n\t\t</div>\n\t\t<table class=\"table-striped\">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t<th>Decade</th>\n\t\t\t\t\t<th>Genre</th>\n\t\t\t\t\t<th>Difficulty</th>\n\t\t\t\t\t<th>Language</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody class=\"table-hover\">\n\t\t\t\t<tr repeat.for=\"artist of filteredArtists\" click.delegate=\"router.navigateToRoute('artist-edit', { id: artist._id })\">\n\t\t\t\t\t<td>${artist.name}</td>\n\t\t\t\t\t<td>${artist.decade}s</td>\n\t\t\t\t\t<td class=\"capitalize\">${artist.genre}</td>\n\t\t\t\t\t<td>${artist.difficulty}</td>\n\t\t\t\t\t<td class=\"capitalize\">${artist.language}</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</template>\n"; });
define('text!../style/global/helpers.css', ['module'], function(module) { module.exports = ".bold {\n\tfont-weight: bold;\n}\n\n.float-left {\n\tfloat: left;\n}\n.float-right {\n\tfloat: right;\n}\n\n.clear-fix, .clearfix {\n\tclear: both;\n}\n\n.pointer {\n\tcursor: pointer;\n}\n\n.capitalize {\n\ttext-transform: capitalize;\n}\n\n.vertical-align-outer {\n\tdisplay: table;\n\theight: 100%;\n\tmargin: auto;\n}\n\n.vertical-align-outer .vertical-align-inner {\n\tdisplay: table-cell;\n\tvertical-align: middle;\n}\n"; });
define('text!admin/duel-themes/edit.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"duel-theme-edit\">\n\t\t<form>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"theme\">Theme</label>\n\t\t\t\t<input value.bind=\"duelTheme.theme\" type=\"text\" id=\"theme\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"difficulty\">Difficulty ${duelTheme.difficulty}</label>\n\t\t\t\t<input value.bind=\"duelTheme.difficulty\" type=\"range\" min=\"1\" max=\"10\" id=\"difficulty\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<button if.bind=\"!duelTheme._id\" click.delegate=\"create()\" class=\"btn btn-block btn-success create\">Create</button>\n\t\t\t\t<button if.bind=\"duelTheme._id\" click.delegate=\"update()\" class=\"btn btn-success btn-left update\">Update</button>\n\t\t\t\t<button if.bind=\"duelTheme._id\" click.delegate=\"destroy()\" class=\"btn btn-danger btn-right update\">Delete</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</template>\n"; });
define('text!../style/global/layout.css', ['module'], function(module) { module.exports = "body {\n\tmargin: 0;\n\tbackground: #000;\n\twidth: 100vw;\n\theight: 100vh;\n}\n\n.logo {\n\tmargin: auto;\n\tpadding: 30px;\n}\n\n.fullscreen {\n\ttext-align: center;\n}\n\n.fullscreen span {\n\tcursor: pointer;\n\tdisplay: inline-block;\n\tpadding: 20px;\n}\n"; });
define('text!admin/duel-themes/list.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"duel-theme-list\">\n\t\t<div class=\"controls\">\n\t\t\t<input value.bind=\"search\" type=\"text\" class=\"search\" placeholder=\"Search\" change.bind=\"filter(search)\" />\n\t\t\t<a class=\"new btn btn-primary\" route-href=\"route: duel-theme-create\">New</a>\n\t\t</div>\n\t\t<table class=\"table-striped\">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Theme</th>\n\t\t\t\t\t<th>Difficulty</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody class=\"table-hover\">\n\t\t\t\t<tr repeat.for=\"duelTheme of filteredDuelThemes\" click.delegate=\"router.navigateToRoute('duel-theme-edit', { id: duelTheme._id })\">\n\t\t\t\t\t<td>${duelTheme.theme}</td>\n\t\t\t\t\t<td>${duelTheme.difficulty}</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</template>\n"; });
define('text!../style/global/reset.css', ['module'], function(module) { module.exports = "* {\n\tbox-sizing: border-box;\n}\n\nhtml {\n\theight: 100%;\n\tfont-family: sans-serif;\n\t-ms-text-size-adjust: 100%;\n\t-webkit-text-size-adjust: 100%;\n}\n\nbody {\n\tbackground: #000;\n\tcolor: #fff;\n\tfont-size: 14px;\n\theight: 100%;\n\tline-height: 1;\n\tmargin: 0;\n}\n\narticle, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {\n  display: block;\n}\n\na {\n\tbackground: transparent;\n\tcolor: #fff;\n\tfont-size: 100%;\n\tmargin: 0;\n\tpadding: 0;\n\ttext-decoration: none;\n\tvertical-align: baseline;\n}\n\na:active, a:hover {\n\toutline: 0;\n}\n\nsmall {\n\tfont-size: 80%;\n}\n\ntable {\n\tborder-collapse: collapse;\n\tborder-spacing: 0;\n}\n\nhr {\n\tborder: 0;\n\tborder-top: 1px solid #ccc;\n\tdisplay: block;\n\theight: 1px;\n\tmargin: 1em 0;\n\tpadding: 0;\n}\n\ninput, select {\n\tvertical-align: middle;\n}\n\nimg {\n\tdisplay: block;\n\tmax-width: 100%;\n\tborder: 0;\n}\n\nul, ol {\n\tlist-style: none;\n\tmargin: 0;\n\tpadding: 0;\n}\n"; });
define('text!admin/songs/edit.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"song-edit\">\n\t\t<form>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"name\">Name</label>\n\t\t\t\t<input value.bind=\"song.name\" type=\"text\" id=\"name\" autofocus />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"artist\">Artist</label>\n\t\t\t\t<select value.bind=\"song.artist\" id=\"artist\" change.delegate=\"setGenre(song.artist)\">\n\t\t\t\t\t<option value=\"\" selected>Select Artist</option>\n\t\t\t\t\t<option repeat.for=\"artist of artists\" value=\"${artist._id}\">${artist.name}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"difficulty\">Difficulty ${song.difficulty}</label>\n\t\t\t\t<input value.bind=\"song.difficulty\" type=\"range\" min=\"1\" max=\"10\" id=\"difficulty\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"album\">Album</label>\n\t\t\t\t<input value.bind=\"song.album\" type=\"text\" id=\"album\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"genre\">Genre</label>\n\t\t\t\t<select value.bind=\"song.genre\" id=\"genre\" class=\"capitalize\">\n\t\t\t\t\t<option repeat.for=\"genre of genres\">${genre}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"released\">Released</label>\n\t\t\t\t<input value.bind=\"song.released\" type=\"number\" placeholder=\"yyyy\" id=\"released\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"lyrics\">Lyrics</label>\n\t\t\t\t<textarea value.bind=\"song.lyrics\" rows=\"10\" id=\"lyrics\"></textarea>\n\t\t\t</div>\n\n\t\t\t<div class=\"distortions form-group\">\n\t\t\t\t<h4>Distortions</h4>\n\t\t\t\t<a class=\"add btn btn-primary\" click.delegate=\"addDistortion()\">Add</a>\n\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t<div class=\"distortion\" repeat.for=\"distortion of song.distortions\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label>Distortion</label>\n\t\t\t\t\t\t<input value.bind=\"distortion.distortion\" type=\"text\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label>Difficulty</label>\n\t\t\t\t\t\t<select value.bind=\"distortion.difficulty\">\n\t\t\t\t\t\t\t<option repeat.for=\"difficulty of difficulties\">${difficulty}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<a click.delegate=\"removeDistortion(distortion)\" class=\"btn btn-warning fa fa-trash\"></a>\n\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"findSongs form-group\">\n\t\t\t\t<h4>Find Songs</h4>\n\t\t\t\t<a class=\"add btn btn-primary\" click.delegate=\"addFindSong()\">Add</a>\n\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t<div class=\"findSong\" repeat.for=\"findSong of song.findSongs\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label>Phrase</label>\n\t\t\t\t\t\t<input value.bind=\"findSong.phrase\" type=\"text\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label>Difficulty</label>\n\t\t\t\t\t\t<select value.bind=\"findSong.difficulty\">\n\t\t\t\t\t\t\t<option repeat.for=\"difficulty of difficulties\">${difficulty}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<a click.delegate=\"removeFindSong(findSong)\" class=\"btn btn-warning fa fa-trash\"></a>\n\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"intro form-group\">\n\t\t\t\t<h4>Intro</h4>\n\t\t\t\t<a if.bind=\"!song.intro\" class=\"add btn btn-primary\" click.delegate=\"addIntro()\">Add</a>\n\t\t\t\t<a if.bind=\"song.intro\" class=\"remove btn btn-warning fa fa-trash\" click.delegate=\"removeIntro()\"></a>\n\t\t\t\t<div class=\"clearfix\"></div>\n\n\t\t\t\t<div if.bind=\"song.intro\" class=\"intro-container\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"videoId\">Video ID</label>\n\t\t\t\t\t\t<input value.bind=\"intro.videoId\" type=\"text\" id=\"videoId\" />\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label>Difficulty</label>\n\t\t\t\t\t\t<select value.bind=\"intro.difficulty\">\n\t\t\t\t\t\t\t<option repeat.for=\"difficulty of difficulties\">${difficulty}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"clearfix\"></div>\n\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"start\">Start</label>\n\t\t\t\t\t\t<input value.bind=\"intro.start\" type=\"number\" id=\"start\" />\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"end\">End</label>\n\t\t\t\t\t\t<input value.bind=\"intro.end\" type=\"number\" id=\"end\" />\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"chorus\">Chorus</label>\n\t\t\t\t\t\t<input value.bind=\"intro.chorus\" type=\"number\" id=\"chorus\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"clearfix\"></div>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<button if.bind=\"!song._id\" click.delegate=\"create()\" class=\"btn btn-block btn-success create\">Create</button>\n\t\t\t\t<button if.bind=\"song._id\" click.delegate=\"update()\" class=\"btn btn-success btn-left update\">Update</button>\n\t\t\t\t<button if.bind=\"song._id\" click.delegate=\"destroy()\" class=\"btn btn-danger btn-right update\">Delete</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</template>\n"; });
define('text!../style/global/settings.css', ['module'], function(module) { module.exports = "\n\n"; });
define('text!admin/songs/list.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"song-list\">\n\t\t<div class=\"controls\">\n\t\t\t<input value.bind=\"search\" type=\"text\" class=\"search\" placeholder=\"Search\" change.bind=\"filter(search)\" />\n\t\t\t<a class=\"new btn btn-primary\" route-href=\"route: song-create\">New</a>\n\t\t</div>\n\t\t<table class=\"table-striped\">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t<th>Artist</th>\n\t\t\t\t\t<th>Genre</th>\n\t\t\t\t\t<th>Released</th>\n\t\t\t\t\t<th>Distortions</th>\n\t\t\t\t\t<th>Find Songs</th>\n\t\t\t\t\t<th>Intro</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody class=\"table-hover\">\n\t\t\t\t<tr repeat.for=\"song of filteredSongs\" click.delegate=\"router.navigateToRoute('song-edit', { id: song._id })\">\n\t\t\t\t\t<td>${song.name}</td>\n\t\t\t\t\t<td>${song.artist.name}</td>\n\t\t\t\t\t<td class=\"capitalize\">${song.genre}</td>\n\t\t\t\t\t<td>${song.released}</td>\n\t\t\t\t\t<td>${song.distortions.length || ''}</td>\n\t\t\t\t\t<td>${song.findSongs.length || ''}</td>\n\t\t\t\t\t<td>${song.intro ? (song.intro.end - song.intro.start || '~') + 's' : ''}</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</template>\n"; });
define('text!../style/global/tables.css', ['module'], function(module) { module.exports = "table {\n\twidth: 100%;\n}\n\nthead {\n\tborder-bottom: 1px solid #fff;\n}\n\n.table-striped tbody tr {\n}\n\n.table-striped tbody tr:nth-of-type(odd) {\n\tbackground: lighten(#000, 5%);\n}\n\ntbody.table-hover tr, .table-hover tr {\n\tcursor: pointer\n}\n\ntbody.table-hover tr:hover, .table-hover tr:hover {\n\tbackground: lighten(#000, 20%);\n}\n\nth {\n\ttext-align: left;\n\tpadding: 8px;\n\tborder-bottom: 2px solid #333\n}\n\ntd {\n\tpadding: 5px;\n\tline-height: 20px;\n\tvertical-align: top;\n\tborder-top: 1px solid #333;\n}\n"; });
define('text!admin/users/edit.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"user-edit\">\n\t\t<form>\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"name\">Name</label>\n\t\t\t\t<input value.bind=\"user.name\" type=\"text\" id=\"name\" autofocus />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"username\">Username</label>\n\t\t\t\t<input value.bind=\"user.username\" type=\"text\" id=\"username\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"email\">Email</label>\n\t\t\t\t<input value.bind=\"user.email\" type=\"text\" id=\"email\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"password\">Password</label>\n\t\t\t\t<input value.bind=\"user.password\" type=\"password\" id=\"password\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label for=\"authorities\">Authorities</label>\n\t\t\t\t<select class=\"multiple\" value.bind=\"user.authorities\" size.bind=\"authorities.length\" id=\"authorities\" multiple>\n\t\t\t\t\t<option repeat.for=\"authority of authorities\">${authority}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<button if.bind=\"!user._id\" click.delegate=\"create()\" class=\"btn btn-block btn-success create\">Create</button>\n\t\t\t\t<button if.bind=\"user._id\" click.delegate=\"update()\" class=\"btn btn-success btn-left update\">Update</button>\n\t\t\t\t<button if.bind=\"user._id\" click.delegate=\"destroy()\" class=\"btn btn-danger btn-right update\">Delete</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>\n</template>\n"; });
define('text!../style/global/typography.css', ['module'], function(module) { module.exports = "html {\n\tfont-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n\tcolor: #fff;\n}\nh1, h2, h3, h4, h5, h6 {\n\tmargin-top: 0;\n}\n\nh1 {\n\tfont-size:48px;\n\tmargin-bottom:.3em;\n\ttext-transform:uppercase;\n}\nh2 {\n\tfont-size:34px;\n\tmargin-bottom:.3em;\n\ttext-transform:uppercase;\n}\nh3 {\n\tfont-size:28px;\n\tmargin-bottom:.4em;\n}\nh4 {\n\tfont-size:24px;\n\tmargin-bottom:.4em;\n}\nh5 {\n\tfont-size:20px;\n\tmargin-bottom:.5em;\n}\nh6 {\n\tfont-size:18px;\n}\n\np {\n\tfont-size:13px;\n\tmargin-bottom:1.5em;\n}\n\na {\n\tcolor: #fff;\n\tdecoration: none\n}\n\na:hover {\n\tcolor: darken(#fff, 15%);\n\tdecoration: underline;\n}\n"; });
define('text!admin/users/list.html', ['module'], function(module) { module.exports = "<template>\n\t<div class=\"user-list\">\n\t\t<div class=\"controls\">\n\t\t\t<input value.bind=\"search\" type=\"text\" class=\"search\" placeholder=\"Search\" change.bind=\"filter(search)\" />\n\t\t\t<a class=\"new btn btn-primary\" route-href=\"route: user-create\">New</a>\n\t\t</div>\n\t\t<table class=\"table-striped\">\n\t\t\t<thead>\n\t\t\t\t<tr>\n\t\t\t\t\t<th>Username</th>\n\t\t\t\t\t<th>Name</th>\n\t\t\t\t\t<th>Email</th>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody class=\"table-hover\">\n\t\t\t\t<tr repeat.for=\"user of filteredUsers\" click.delegate=\"router.navigateToRoute('user-edit', { id: user._id })\">\n\t\t\t\t\t<td>${user.username}</td>\n\t\t\t\t\t<td>${user.name}</td>\n\t\t\t\t\t<td>${user.email}</td>\n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</template>\n"; });
define('text!../style/score/score.css', ['module'], function(module) { module.exports = ".red-team, .blue-team{\n\tcursor:pointer;\n\tfont-size:48px;\n\tpadding:10px 20px;\n\tposition:absolute;\n\ttop:0;\n}\n.red-team{\n\tbackground:#a00;\n\tborder-bottom-right-radius:10px;\n\tleft:0;\n}\n.blue-team{\n\tbackground:#56e;\n\tborder-bottom-left-radius:10px;\n\tright:0;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map