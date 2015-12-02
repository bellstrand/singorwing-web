'use strict';

let gulp = require('gulp'),
	browserSync = require('browser-sync'),
	history = require('connect-history-api-fallback');

gulp.task('serve', ['build'], done => {
	browserSync({
		online: false,
		open: false,
		port: 9000,
		server: {
			baseDir: ['.'],
			middleware: [history(), (req, res, next) => {
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			}]
		}
	}, done);
});
