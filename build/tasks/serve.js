'use strict';

let gulp = require('gulp'),
	browserSync = require('browser-sync'),
	url = require('url'),
	proxy = require('proxy-middleware'),
	history = require('connect-history-api-fallback');

gulp.task('serve', ['build'], done => {
	let proxyOptions = url.parse('http://localhost:8000/api');
	proxyOptions.route = '/api';
	browserSync({
		online: false,
		open: false,
		port: 9000,
		server: {
			baseDir: ['.'],
			middleware: [proxy(proxyOptions), history(), (req, res, next) => {
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			}]
		}
	}, done);
});
