import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import eslint from 'gulp-eslint';
import project from '../aurelia.json';

function lint() {
	return gulp.src(project.transpiler.source)
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

export default lint;
