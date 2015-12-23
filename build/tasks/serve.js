'use strict';

let gulp = require('gulp'),
	browserSync = require('browser-sync'),
	url = require('url'),
	proxy = require('proxy-middleware'),
	history = require('connect-history-api-fallback');

gulp.task('serve', ['build'], done => {
	let apiProxyOptions = url.parse('http://localhost:8000/api');
	apiProxyOptions.route = '/api';
	let imageProxyOptions = url.parse('http://localhost:8000/images');
	imageProxyOptions.route = '/images';
	browserSync({
		online: false,
		open: false,
		port: 9000,
		server: {
			baseDir: ['.'],
			middleware: [proxy(apiProxyOptions), proxy(imageProxyOptions), history(), (req, res, next) => {
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			}]
		}
	}, done);
});
