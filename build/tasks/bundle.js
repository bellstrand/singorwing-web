'use strict';

let gulp = require('gulp'),
	bundler = require('aurelia-bundler'),
	bundles = require('../bundles.js');

let config = {
	force: true,
	baseURL: '.',
	configPath: './config.js',
	bundles: bundles.bundles
};

gulp.task('bundle', ['build'], function() {
	return bundler.bundle(config);
});

gulp.task('unbundle', function() {
	return bundler.unbundle(config);
});
