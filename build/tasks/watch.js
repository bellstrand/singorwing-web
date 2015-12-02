'use strict';

let gulp = require('gulp'),
	paths = require('../paths'),
	browserSync = require('browser-sync');

function reportChange(event) {
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
}

gulp.task('watch', ['serve'], () => {
	gulp.watch(paths.src, ['build-js', browserSync.reload]).on('change', reportChange);
	gulp.watch(paths.html, ['build-html', browserSync.reload]).on('change', reportChange);
	gulp.watch(paths.sass, ['build-css', () => {
		return gulp.src(paths.style)
			.pipe(browserSync.stream());
	}]).on('change', reportChange);
	gulp.watch('index.html', browserSync.reload).on('change', reportChange);
	gulp.watch('config.js', browserSync.reload).on('change', reportChange);
});
