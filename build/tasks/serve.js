'use strict';

let gulp = require('gulp'),
	browserSync = require('browser-sync');

gulp.task('serve', ['build'], done => {
	browserSync({
		online: false,
		open: false,
		port: 9000,
		server: {
			baseDir: ['.'],
			middleware: (req, res, next) => {
				res.setHeader('Access-Control-Allow-Origin', '*');
				next();
			}
		}
	}, done);
});
